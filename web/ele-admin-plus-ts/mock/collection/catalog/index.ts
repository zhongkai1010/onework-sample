import { mock } from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'

// 藏品信息
interface Collection {
  id: number
  collectionStatus: string
  imageInfo: string
  numberCategory: string
  collectionCode: string
  collectionName: string
  categoryName: string
  categoryId: string
  rfidCode: string
  quantity: number
  unit: string
  eraType: string
  era: string
  artist: string
  regionType: string
  region: string
  materialType: string
  material: string
  overallLength: number
  overallWidth: number
  totalHeight: number
  specificDimensions: string
  weightRange: string
  specificWeight: number
  weightUnit: string
  culturalLevel: string
  collectionSource: string
  condition: string
  preservationStatus: string
  collectionDate: string
  collectionDateRange: string
  collectionYear: string
  type: string
  culturalType: string
  collectionIntroduction: string
  textType: string
  audioVisualCarrierType: string
  audioVisualStorageLocation: string
  diskPath: string
  colorCategory: string
  colorDescription: string
  warehouseId: string
  warehouseName: string
  notes: string
  museumEntryTime: string
  collectionTime: string
  loginTime: string
  cabinetEntryTime: string
}

// 藏品查询参数
interface CollectionQueryParams {
  page?: number
  size?: number
  collectionCode?: string
  collectionName?: string
  categoryId?: string
  regionType?: string
  region?: string
  collectionSource?: string
  collectionTime?: string
  type?: string
}

// 生成藏品列表数据
const generateCollectionList = (count: number): Collection[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    collectionStatus: mock('@pick(["待审核", "已审核", "已退回"])'),
    imageInfo: mock('@image("200x200", "#50B347", "#FFF", "Mock")'),
    numberCategory: mock('@pick(["文物", "艺术品", "文献"])'),
    collectionCode: mock('@string("upper", 8)'),
    collectionName: mock('@ctitle(3, 8)'),
    categoryName: mock('@pick(["书画", "陶瓷", "玉器", "青铜器"])'),
    categoryId: mock('@integer(1, 16)'),
    rfidCode: mock('@string("upper", 10)'),
    quantity: mock('@integer(1, 100)'),
    unit: mock('@pick(["件", "套", "册"])'),
    eraType: mock('@pick(["古代", "近代", "现代"])'),
    era: mock('@pick(["唐代", "宋代", "元代", "明代", "清代"])'),
    artist: mock('@cname'),
    regionType: mock('@pick(["国内", "国外"])'),
    region: mock('@province'),
    materialType: mock('@pick(["金属", "陶瓷", "玉石", "纸质"])'),
    material: mock('@pick(["青铜", "瓷器", "和田玉", "宣纸"])'),
    overallLength: mock('@float(10, 100, 1, 1)'),
    overallWidth: mock('@float(10, 100, 1, 1)'),
    totalHeight: mock('@float(10, 100, 1, 1)'),
    specificDimensions: mock('@string("number", 3) + "x" + @string("number", 3) + "x" + @string("number", 3)'),
    weightRange: mock('@pick(["轻", "中", "重"])'),
    specificWeight: mock('@float(0.1, 10, 1, 1)'),
    weightUnit: mock('@pick(["kg", "g"])'),
    culturalLevel: mock('@pick(["一级", "二级", "三级"])'),
    collectionSource: mock('@pick(["征集", "捐赠", "考古发掘"])'),
    condition: mock('@pick(["完好", "轻微破损", "严重破损"])'),
    preservationStatus: mock('@pick(["良好", "一般", "较差"])'),
    collectionDate: mock('@date("yyyy-MM-dd")'),
    collectionDateRange: mock('@date("yyyy-MM-dd") + "至" + @date("yyyy-MM-dd")'),
    collectionYear: mock('@date("yyyy")'),
    type: mock('@pick(["文物", "艺术品", "文献"])'),
    culturalType: mock('@pick(["历史文物", "艺术文物", "科技文物"])'),
    collectionIntroduction: mock('@cparagraph(1, 3)'),
    textType: mock('@pick(["纸质", "电子"])'),
    audioVisualCarrierType: mock('@pick(["光盘", "硬盘", "U盘"])'),
    audioVisualStorageLocation: mock('@pick(["A区", "B区", "C区"])'),
    diskPath: mock('@string("lower", 10)'),
    colorCategory: mock('@pick(["单色", "多色"])'),
    colorDescription: mock('@pick(["红色", "蓝色", "绿色", "黄色"])'),
    warehouseId: mock('@guid'),
    warehouseName: mock('@pick(["一号库房", "二号库房", "三号库房"])'),
    notes: mock('@cparagraph(1, 2)'),
    museumEntryTime: mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
    collectionTime: mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
    loginTime: mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
    cabinetEntryTime: mock('@datetime("yyyy-MM-dd HH:mm:ss")')
  }))
}

// 生成分页数据
const generatePageData = (params: CollectionQueryParams) => {
  const { page = 1, size = 10 } = params
  const total = 100
  const list = generateCollectionList(size)

  return {
    total,
    list,
    page,
    size
  }
}

export default [
  // 查询藏品编目分页列表
  {
    url: '/api/collection/catalog',
    method: 'get',
    response: ({ query }: { query: CollectionQueryParams }) => {
      return {
        code: 0,
        message: 'success',
        data: generatePageData(query)
      }
    }
  },
  // 编辑藏品
  {
    url: '/api/collection/catalog',
    method: 'put',
    response: () => {
      return {
        code: 0,
        message: '编辑成功'
      }
    }
  },
  // 删除藏品
  {
    url: '/api/collection/catalog',
    method: 'delete',
    response: () => {
      return {
        code: 0,
        message: '删除成功'
      }
    }
  },
  // 藏品登记
  {
    url: '/api/collection/catalog/register',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '登记成功'
      }
    }
  },
  // 审核通过藏品
  {
    url: '/api/collection/catalog/approve',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '审核通过'
      }
    }
  },
  // 导入藏品
  {
    url: '/api/collection/catalog/import',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '导入成功'
      }
    }
  },
  // 查询藏品详情
  {
    url: '/api/collection/catalog/details',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: generateCollectionList(1)[0]
      }
    }
  },
  // 查询藏品预备帐分页列表
  {
    url: '/api/collection/catalog/preparation',
    method: 'get',
    response: ({ query }: { query: CollectionQueryParams }) => {
      return {
        code: 0,
        message: 'success',
        data: generatePageData(query)
      }
    }
  },
  // 藏品退回编目
  {
    url: '/api/collection/catalog/return',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '退回成功'
      }
    }
  },
  // 绑定RFID
  {
    url: '/api/collection/catalog/bind-rfid',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '绑定成功'
      }
    }
  },
  // 批量修改分类
  {
    url: '/api/collection/catalog/update-category',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '修改成功'
      }
    }
  }
] as MockMethod[]
