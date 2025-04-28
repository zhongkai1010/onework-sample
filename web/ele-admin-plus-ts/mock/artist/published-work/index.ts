import { mock } from 'mockjs';
import type { MockMethod } from 'vite-plugin-mock';

interface Publication {
  id: string;
  bookTitle: string;
  artistName: string;
  publisher: string;
  format: string;
  author: string;
  edition: string;
  coverImage: string;
  price: number;
}

// 生成模拟数据
const publicationList: Publication[] = Array.from({ length: 20 }, (_, i) => ({
  id: (i + 1).toString(),
  bookTitle: mock('@ctitle(3, 8)'),
  artistName: mock('@cname'),
  publisher: mock('@ctitle(2, 4)') + '出版社',
  format: mock('@pick(["16开", "32开", "8开", "4开"])'),
  author: mock('@cname'),
  edition:
    mock('@pick(["第一版", "第二版", "第三版"])') +
    mock('@pick(["第一次印刷", "第二次印刷"])'),
  coverImage: mock('@image("400x600", "@color")'),
  price: mock('@float(20, 200, 2, 2)')
}));

export default [
  // 查询出版著作列表
  {
    url: '/api/artist/published-work',
    method: 'get',
    response: ({ query }) => {
      let data = [...publicationList];

      // 按出版物题名筛选
      if (query.bookTitle) {
        data = data.filter((item) => item.bookTitle.includes(query.bookTitle));
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

  // 添加出版著作
  {
    url: '/api/artist/published-work',
    method: 'post',
    response: ({ body }) => {
      const id = (
        parseInt(publicationList[publicationList.length - 1].id) + 1
      ).toString();
      const newPublication: Publication = {
        id,
        bookTitle: body.bookTitle,
        artistName: body.artistName,
        publisher: body.publisher,
        format: body.format,
        author: body.author,
        edition: body.edition,
        coverImage: body.coverImage || mock('@image("400x600", "@color")'),
        price: body.price
      };
      publicationList.push(newPublication);
      return {
        code: 0,
        message: '添加成功'
      };
    }
  },

  // 修改出版著作
  {
    url: '/api/artist/published-work/:id',
    method: 'put',
    response: ({ body }) => {
      const index = publicationList.findIndex((item) => item.id === body.id);
      if (index !== -1) {
        publicationList[index] = {
          ...publicationList[index],
          ...body
        };
      }
      return {
        code: 0,
        message: '修改成功'
      };
    }
  },

  // 删除出版著作
  {
    url: '/api/artist/published-work/:id',
    method: 'delete',
    response: ({ query }) => {
      const index = publicationList.findIndex((item) => item.id === query.id);
      if (index !== -1) {
        publicationList.splice(index, 1);
      }
      return {
        code: 0,
        message: '删除成功'
      };
    }
  }
] as MockMethod[];
