import { mock } from 'mockjs';
import type { MockMethod } from 'vite-plugin-mock';

interface Exhibition {
  id: string;
  code: string;
  exhibitionTitle: string;
  exhibitionStartDate: string;
  exhibitionEndDate: string;
  exhibitionInstitution: string;
  exhibitionCity: string;
  exhibitionAddress: string;
  artistName: string;
  coverImage: string;
}

// 生成模拟数据
const exhibitionList: Exhibition[] = Array.from({ length: 20 }, (_, i) => ({
  id: (i + 1).toString(),
  code: mock('@string("upper", 2)') + mock('@string("number", 4)'),
  exhibitionTitle: mock('@ctitle(5, 10)') + '艺术展',
  exhibitionStartDate: mock('@date'),
  exhibitionEndDate: mock('@date'),
  exhibitionInstitution: mock('@ctitle(3, 5)') + '美术馆',
  exhibitionCity: mock('@city'),
  exhibitionAddress:
    mock('@county') +
    mock('@ctitle(2, 3)') +
    '路' +
    mock('@integer(1, 999)') +
    '号',
  artistName: mock('@cname'),
  coverImage: mock('@image("800x600", "@color")')
}));

export default [
  // 查询展览列表
  {
    url: '/api/artist/exhibition',
    method: 'get',
    response: ({ query }) => {
      let data = [...exhibitionList];

      // 按展览标题筛选
      if (query.exhibitionTitle) {
        data = data.filter((item) =>
          item.exhibitionTitle.includes(query.exhibitionTitle)
        );
      }
      // 按艺术家名称筛选
      if (query.artistName) {
        data = data.filter((item) =>
          item.artistName.includes(query.artistName)
        );
      }
      // 按ID筛选
      if (query.id) {
        data = data.filter((item) => item.id === query.id);
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

  // 查询展览详情
  {
    url: '/api/artist/exhibition/:id',
    method: 'get',
    response: ({ query }) => {
      const exhibition = exhibitionList.find((item) => item.id === query.id);
      return {
        code: 0,
        message: 'ok',
        data: exhibition
      };
    }
  },

  // 添加展览
  {
    url: '/api/artist/exhibition',
    method: 'post',
    response: ({ body }) => {
      const id = (
        parseInt(exhibitionList[exhibitionList.length - 1].id) + 1
      ).toString();
      const newExhibition: Exhibition = {
        id,
        code:
          body.code ||
          mock('@string("upper", 2)') + mock('@string("number", 4)'),
        exhibitionTitle: body.exhibitionTitle,
        exhibitionStartDate: body.exhibitionStartDate,
        exhibitionEndDate: body.exhibitionEndDate,
        exhibitionInstitution: body.exhibitionInstitution,
        exhibitionCity: body.exhibitionCity,
        exhibitionAddress: body.exhibitionAddress,
        artistName: body.artistName,
        coverImage: body.coverImage || mock('@image("800x600", "@color")')
      };
      exhibitionList.push(newExhibition);
      return {
        code: 0,
        message: '添加成功'
      };
    }
  },

  // 修改展览
  {
    url: '/api/artist/exhibition',
    method: 'put',
    response: ({ body }) => {
      const index = exhibitionList.findIndex((item) => item.id === body.id);
      if (index !== -1) {
        exhibitionList[index] = {
          ...exhibitionList[index],
          ...body
        };
      }
      return {
        code: 0,
        message: '修改成功'
      };
    }
  },

  // 删除展览
  {
    url: '/api/artist/exhibition/:id',
    method: 'delete',
    response: ({ query }) => {
      const index = exhibitionList.findIndex((item) => item.id === query.id);
      if (index !== -1) {
        exhibitionList.splice(index, 1);
      }
      return {
        code: 0,
        message: '删除成功'
      };
    }
  }
] as MockMethod[];
