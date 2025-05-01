import { mock } from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/inventory/warehouse/all',
    method: 'get',
    response: () => {
      interface WarehouseItem {
        id: number
        code: string
        parentId: number | null
        name: string
        tier: number
        type: number
        remark: string
        columnCount: number
        sectionCount: number
        layerCount: number
        fixedColumnType: string
        children: WarehouseItem[]
      }

      const generateData = (count: number): WarehouseItem[] => {
        const data: WarehouseItem[] = []
        let id = 1
        const types = [1, 2] // 1:库房, 2:展区
        const tiers = [1, 2, 3, 4, 5] // 1-5级

        for (let i = 0; i < count; i++) {
          const type = types[Math.floor(Math.random() * types.length)]
          const tier = tiers[Math.floor(Math.random() * tiers.length)]
          const parentId = Math.random() > 0.3 ? Math.floor(Math.random() * id) : null

          const item: WarehouseItem = {
            id: id++,
            code: mock('@string("upper", 8)'),
            parentId,
            name: `${type === 1 ? '库房' : '展区'}${i + 1}`,
            tier,
            type,
            remark: mock('@cparagraph(1, 3)'),
            columnCount: mock('@integer(1, 10)'),
            sectionCount: mock('@integer(1, 5)'),
            layerCount: mock('@integer(1, 3)'),
            fixedColumnType: mock('@string("upper", 1)'),
            children: []
          }

          data.push(item)
        }

        return data.reduce<WarehouseItem[]>((acc, item) => {
          if (item.parentId === null) {
            acc.push(item)
          } else {
            const parent = data.find((p) => p.id === item.parentId)
            if (parent) {
              parent.children.push(item)
            }
          }
          return acc
        }, [])
      }

      return {
        code: 0,
        message: 'success',
        data: generateData(mock('@integer(20, 30)'))
      }
    }
  },
  {
    url: '/api/inventory/warehouse',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '新增库房成功',
        data: null
      }
    }
  },
  {
    url: '/api/inventory/warehouse',
    method: 'put',
    response: () => {
      return {
        code: 0,
        message: '修改库房成功',
        data: null
      }
    }
  },
  {
    url: '/api/inventory/warehouse',
    method: 'delete',
    response: () => {
      return {
        code: 0,
        message: '删除库房成功',
        data: null
      }
    }
  },
  {
    url: '/api/inventory/warehouse/collection',
    method: 'get',
    response: ({ query }) => {
      const { warehouseId, collectionCode, collectionName, categoryId } = query
      return {
        code: 0,
        message: 'success',
        data: {
          count: 100,
          list: Array.from({ length: 10 }, () => ({
            id: mock('@id'),
            collectionStatus: mock('@integer(0, 1)'),
            imageInfo: mock('@url'),
            numberCategory: mock('@string("upper", 2)'),
            collectionCode: collectionCode || mock('@string("upper", 8)'),
            collectionName: collectionName || mock('@ctitle'),
            categoryName: mock('@ctitle'),
            categoryId: categoryId || mock('@id'),
            rfidCode: mock('@string("upper", 8)'),
            quantity: mock('@integer(1, 100)'),
            unit: '件',
            eraType: mock('@ctitle'),
            era: mock('@ctitle'),
            artist: mock('@cname'),
            regionType: mock('@ctitle'),
            region: mock('@ctitle'),
            materialType: mock('@ctitle'),
            material: mock('@ctitle'),
            overallLength: mock('@float(10, 100, 2, 2)'),
            overallWidth: mock('@float(10, 100, 2, 2)'),
            totalHeight: mock('@float(10, 100, 2, 2)'),
            specificDimensions: mock('@ctitle'),
            weightRange: mock('@ctitle'),
            specificWeight: mock('@float(1, 10, 2, 2)'),
            weightUnit: 'kg',
            culturalLevel: mock('@ctitle'),
            collectionSource: mock('@ctitle'),
            condition: mock('@ctitle'),
            preservationStatus: mock('@ctitle'),
            collectionDate: mock('@date'),
            collectionDateRange: mock('@date'),
            collectionYear: mock('@date("yyyy")'),
            type: mock('@ctitle'),
            culturalType: mock('@ctitle'),
            collectionIntroduction: mock('@cparagraph'),
            textType: mock('@ctitle'),
            audioVisualCarrierType: mock('@ctitle'),
            audioVisualStorageLocation: mock('@ctitle'),
            diskPath: mock('@url'),
            colorCategory: mock('@ctitle'),
            colorDescription: mock('@ctitle'),
            warehouseId: warehouseId || mock('@id'),
            warehouseName: mock('@ctitle'),
            notes: mock('@cparagraph'),
            museumEntryTime: mock('@datetime'),
            collectionTime: mock('@datetime'),
            loginTime: mock('@datetime'),
            cabinetEntryTime: mock('@datetime')
          }))
        }
      }
    }
  },
  {
    url: '/api/inventory/warehouse/barcode',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          count: 100,
          list: Array.from({ length: 10 }, () => ({
            id: mock('@id'),
            name: mock('@ctitle'),
            code: mock('@string("upper", 8)')
          }))
        }
      }
    }
  },
  {
    url: '/api/inventory/warehouse/location',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          count: 100,
          list: Array.from({ length: 10 }, () => ({
            id: mock('@id'),
            collectionCode: mock('@string("upper", 8)'),
            code: mock('@string("upper", 8)'),
            bindingTime: mock('@datetime')
          }))
        }
      }
    }
  },
  {
    url: '/api/inventory/warehouse/location',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '绑定成功',
        data: null
      }
    }
  }
] as MockMethod[]
