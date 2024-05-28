import { PluginOption } from 'vite'
import { viteBuildInfo } from './info'

export function getPluginsList(): PluginOption[] {
  return [viteBuildInfo()]
}
