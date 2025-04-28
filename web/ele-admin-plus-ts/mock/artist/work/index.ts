import { mock } from 'mockjs';
import type { MockMethod } from 'vite-plugin-mock';

interface ArtistWork {
  /** ID编号 */
  id: string;
  /** 作品名称 */
  workTitle: string;
  /** 创作年代 */
  creationYear: string;
  /** 尺寸 */
  dimensions: string;
  /** 材质 */
  material: string;
  /** 题材 */
  theme: string;
  /** 装裱 */
  framing: string;
  /** 艺术家名称 */
  artistName: string;
  /** 操作时间 */
  operationTime: string;
  /** 作品图片 */
  workImage: string;
}

interface ArtistWorkQueryParams {
  page?: number;
  limit?: number;
  workTitle?: string;
}

interface ApiResult<T> {
  code: number;
  message: string;
  data: T;
}

interface PageResult<T> {
  list: T[];
  count: number;
  page: number;
  limit: number;
}

// Generate mock artist works data
const artistWorks: ArtistWork[] = Array.from({ length: 100 }, (_, i) => ({
  id: (i + 1).toString(),
  workTitle: mock('@ctitle(3, 10)'),
  creationYear: mock('@date("yyyy")'),
  dimensions: `${mock('@integer(20, 200)')}cm x ${mock('@integer(20, 200)')}cm`,
  material: mock('@pick(["油画", "水彩", "国画", "版画", "雕塑"])'),
  theme: mock('@pick(["人物", "风景", "静物", "抽象", "动物"])'),
  framing: mock('@pick(["有框", "无框"])'),
  artistName: mock('@cname'),
  operationTime: mock('@datetime'),
  workImage: mock('@image("300x200", "@color")')
}));

export default [
  // 查询艺术家作品分页列表
  {
    url: '/api/artist/work',
    method: 'get',
    response: (options: any): ApiResult<PageResult<ArtistWork>> => {
      const {
        page = 1,
        limit = 10,
        workTitle
      } = options.query as ArtistWorkQueryParams;
      let list = [...artistWorks];

      // 按作品名称筛选
      if (workTitle) {
        list = list.filter((item) =>
          item.workTitle.toLowerCase().includes(workTitle.toLowerCase())
        );
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

  // 添加艺术家作品
  {
    url: '/api/artist/work',
    method: 'post',
    response: (options: any): ApiResult<null> => {
      const work = options.body;
      const id = (parseInt(artistWorks[0].id) + 1).toString();
      artistWorks.unshift({
        ...work,
        id,
        operationTime: mock('@datetime')
      });
      return {
        code: 0,
        message: '添加成功',
        data: null
      };
    }
  },

  // 修改艺术家作品
  {
    url: '/api/artist/work',
    method: 'put',
    response: (options: any): ApiResult<null> => {
      const work = options.body as ArtistWork;
      const index = artistWorks.findIndex((item) => item.id === work.id);
      if (index !== -1) {
        artistWorks[index] = {
          ...work,
          operationTime: mock('@datetime')
        };
        return {
          code: 0,
          message: '修改成功',
          data: null
        };
      }
      return {
        code: 1,
        message: '作品不存在',
        data: null
      };
    }
  },

  // 删除艺术家作品
  {
    url: '/api/artist/work/:id',
    method: 'delete',
    response: (options: any): ApiResult<null> => {
      const id = options.query.id || options.params?.id;
      const index = artistWorks.findIndex((item) => item.id === id);
      if (index !== -1) {
        artistWorks.splice(index, 1);
        return {
          code: 0,
          message: '删除成功',
          data: null
        };
      }
      return {
        code: 1,
        message: '作品不存在',
        data: null
      };
    }
  }
] as MockMethod[];
