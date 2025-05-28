import { MockMethod } from 'vite-plugin-mock'
import layoutApi from './layout'
import artistApi from './artist'
import inventoryApi from './inventory'
import collectionApi from './collection'
import dataApi from './data'
import inventoryCheckApi from './inventory-check'

export default [
  ...layoutApi,
  ...artistApi,
  ...inventoryApi,
  ...collectionApi,
  ...dataApi,
  ...inventoryCheckApi
] as MockMethod[]
