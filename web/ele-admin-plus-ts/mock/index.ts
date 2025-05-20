import { MockMethod } from 'vite-plugin-mock'
import layoutApi from './layout'
import artistApi from './artist'
import inventoryApi from './inventory'
import collectionApi from './collection'
import dataApi from './data'

export default [
  ...layoutApi,
  ...artistApi,
  ...inventoryApi,
  ...collectionApi,
  ...dataApi
] as MockMethod[]
