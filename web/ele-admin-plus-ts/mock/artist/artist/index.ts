import { mock } from 'mockjs';
import type { MockMethod } from 'vite-plugin-mock';

interface Artist {
  id: number;
  name: string;
  gender: number;
  birthDate: string;
  deathDate?: string;
  nationality: string;
  style: string;
  introduction: string;
  createTime: string;
  updateTime: string;
}

// 生成模拟数据
const artistList: Artist[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: mock('@cname'),
  gender: mock('@integer(1, 2)'),
  birthDate: mock('@date'),
  deathDate: Math.random() > 0.7 ? mock('@date') : undefined,
  nationality: mock('@pick(["中国", "法国", "意大利", "西班牙", "美国"])'),
  style: mock(
    '@pick(["写实主义", "印象派", "抽象派", "现代主义", "后现代主义"])'
  ),
  introduction: mock('@cparagraph(2)'),
  createTime: mock('@datetime'),
  updateTime: mock('@datetime')
}));

export default [
  // 查询艺术家分页列表
  {
    url: '/api/artist/artist',
    method: 'get',
    response: ({ query }) => {
      let data = [...artistList];

      // 按名称筛选
      if (query.name) {
        data = data.filter((item) => item.name.includes(query.name));
      }
      // 按性别筛选
      if (query.gender !== undefined) {
        data = data.filter((item) => item.gender === parseInt(query.gender));
      }
      // 按国籍筛选
      if (query.nationality) {
        data = data.filter((item) => item.nationality === query.nationality);
      }
      // 按艺术风格筛选
      if (query.style) {
        data = data.filter((item) => item.style === query.style);
      }

      // 分页处理
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;
      const start = (page - 1) * limit;
      const end = start + limit;
      const list = data.slice(start, end);

      return {
        code: 0,
        message: 'ok',
        data: {
          list,
          count: data.length
        }
      };
    }
  },

  // 查询艺术家详情
  {
    url: '/api/artist/artist/:id',
    method: 'get',
    response: ({ query }) => {
      const artist = artistList.find((item) => item.id === parseInt(query.id));
      return {
        code: 0,
        message: 'ok',
        data: artist
      };
    }
  },

  // 添加艺术家
  {
    url: '/api/artist/artist',
    method: 'post',
    response: ({ body }) => {
      const id = Math.max(...artistList.map((item) => item.id)) + 1;
      const newArtist: Artist = {
        ...body,
        id,
        name: body.name || mock('@cname'),
        gender: body.gender || mock('@integer(1, 2)'),
        birthDate: body.birthDate || mock('@date'),
        deathDate: body.deathDate,
        nationality:
          body.nationality ||
          mock('@pick(["中国", "法国", "意大利", "西班牙", "美国"])'),
        style:
          body.style ||
          mock(
            '@pick(["写实主义", "印象派", "抽象派", "现代主义", "后现代主义"])'
          ),
        introduction: body.introduction || mock('@cparagraph(2)'),
        createTime: mock('@datetime'),
        updateTime: mock('@datetime')
      };
      artistList.push(newArtist);
      return {
        code: 0,
        message: '添加成功'
      };
    }
  },

  // 修改艺术家
  {
    url: '/api/artist/artist',
    method: 'put',
    response: ({ body }) => {
      const index = artistList.findIndex((item) => item.id === body.id);
      if (index !== -1) {
        artistList[index] = {
          ...artistList[index],
          ...body,
          updateTime: mock('@datetime')
        };
      }
      return {
        code: 0,
        message: '修改成功'
      };
    }
  },

  // 删除艺术家
  {
    url: '/api/artist/artist/:id',
    method: 'delete',
    response: ({ query }) => {
      const index = artistList.findIndex(
        (item) => item.id === parseInt(query.id)
      );
      if (index !== -1) {
        artistList.splice(index, 1);
      }
      return {
        code: 0,
        message: '删除成功'
      };
    }
  }
] as MockMethod[];
