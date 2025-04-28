import { mock } from 'mockjs';
import type { MockMethod } from 'vite-plugin-mock';

interface BookCollection {
  /** ID编号 */
  id: string;
  /** 编号 */
  code: string;
  /** 单据图片 */
  documentImage: string;
  /** 藏品编码 */
  collectionCode: string;
  /** 藏品ID */
  collectionId: string;
  /** 藏品名称 */
  collectionName: string;
  /** 作者 */
  author: string;
  /** 仓库 */
  warehouse: string;
  /** 图书价值 */
  bookValue: string;
  /** 地址编码 */
  addressCode: string;
  /** 处理状态 */
  status: string;
}

interface BookQueryParams {
  page?: number;
  limit?: number;
  ISBN?: string;
  author?: string;
  bookValue?: string;
  warehouse?: string;
  status?: string;
  type?: string;
}

interface ApiResult<T> {
  code: number;
  message: string;
  data: T | null;
}

interface PageResult<T> {
  list: T[];
  count: number;
  page: number;
  limit: number;
}

// 生成模拟数据
const books: BookCollection[] = Array.from({ length: 100 }, (_, i) => ({
  id: (i + 1).toString(),
  code: mock('@string("upper", 2)') + mock('@string("number", 6)'),
  documentImage: mock('@image("300x200", "@color")'),
  collectionCode: mock('@string("upper", 2)') + mock('@string("number", 6)'),
  collectionId: mock('@id'),
  collectionName: mock('@ctitle(3, 10)'),
  author: mock('@cname'),
  warehouse: mock('@county(true)') + '图书仓库',
  bookValue: mock('@float(100, 10000, 2, 2)') + '元',
  addressCode: mock('@zip'),
  status: mock('@pick(["待审核", "已审核", "已入库"])')
}));

export default [
  // 查询图书分页列表
  {
    url: '/api/collection/book',
    method: 'get',
    response: (options: any): ApiResult<PageResult<BookCollection>> => {
      const {
        page = 1,
        limit = 10,
        ISBN,
        author,
        bookValue,
        warehouse,
        status,
        type
      } = options.query as BookQueryParams;

      let list = [...books];

      // 按条件筛选
      if (ISBN) {
        list = list.filter((item) => item.code.includes(ISBN));
      }
      if (author) {
        list = list.filter((item) => item.author.includes(author));
      }
      if (bookValue) {
        list = list.filter((item) => item.bookValue.includes(bookValue));
      }
      if (warehouse) {
        list = list.filter((item) => item.warehouse.includes(warehouse));
      }
      if (status) {
        list = list.filter((item) => item.status === status);
      }
      if (type) {
        list = list.filter((item) => item.collectionCode.startsWith(type));
      }

      // 分页处理
      const start = (page - 1) * limit;
      const end = start + limit;
      const pageList = list.slice(start, end);

      return {
        code: 0,
        message: 'success',
        data: {
          list: pageList,
          count: list.length,
          page,
          limit
        }
      };
    }
  },

  // 添加图书
  {
    url: '/api/collection/book',
    method: 'post',
    response: (options: any): ApiResult<null> => {
      const book = options.body;
      const id = (parseInt(books[0].id) + 1).toString();
      books.unshift({
        ...book,
        id,
        code: mock('@string("upper", 2)') + mock('@string("number", 6)'),
        documentImage:
          book.documentImage || mock('@image("300x200", "@color")'),
        collectionCode:
          mock('@string("upper", 2)') + mock('@string("number", 6)'),
        collectionName: mock('@ctitle(3, 10)')
      });
      return {
        code: 0,
        message: '添加成功',
        data: null
      };
    }
  },

  // 修改图书
  {
    url: '/api/collection/book',
    method: 'put',
    response: (options: any): ApiResult<null> => {
      const book = options.body as BookCollection;
      const index = books.findIndex((item) => item.id === book.id);
      if (index !== -1) {
        books[index] = book;
        return {
          code: 0,
          message: '修改成功',
          data: null
        };
      }
      return {
        code: 1,
        message: '图书不存在',
        data: null
      };
    }
  },

  // 删除图书
  {
    url: '/api/collection/book',
    method: 'delete',
    response: (options: any): ApiResult<null> => {
      const { ids } = options.body;
      const idList = ids.map(String);
      const indexes = books
        .map((item, index) => (idList.includes(item.id) ? index : -1))
        .filter((index) => index !== -1)
        .sort((a, b) => b - a);

      indexes.forEach((index) => {
        books.splice(index, 1);
      });

      return {
        code: 0,
        message: '删除成功',
        data: null
      };
    }
  },

  // 审核通过图书
  {
    url: '/api/collection/book/approve',
    method: 'post',
    response: (options: any): ApiResult<null> => {
      const { ids } = options.body;
      const idList = ids.map(String);
      books.forEach((book) => {
        if (idList.includes(book.id)) {
          book.status = '已审核';
        }
      });
      return {
        code: 0,
        message: '审核成功',
        data: null
      };
    }
  },

  // 查看图书详情
  {
    url: '/api/collection/book/details',
    method: 'get',
    response: (options: any): ApiResult<BookCollection> => {
      const { id } = options.query;
      const book = books.find((item) => item.id === id);
      if (book) {
        return {
          code: 0,
          message: 'success',
          data: book
        };
      }
      return {
        code: 1,
        message: '图书不存在',
        data: null
      };
    }
  }
] as MockMethod[];
