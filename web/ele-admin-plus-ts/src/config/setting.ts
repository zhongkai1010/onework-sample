/** 接口地址 */
export const API_BASE_URL: string = import.meta.env.VITE_API_URL

/** 项目名称 */
export const PROJECT_NAME: string = import.meta.env.VITE_APP_NAME

/** 不需要登录的路由 */
export const WHITE_LIST: string[] = ['/login', '/forget']

/** 首页路径, 为空则取第一个菜单的地址 */
export const HOME_PATH: string | undefined = void 0

/** 外层布局的路由地址 */
export const LAYOUT_PATH = '/'

/** 刷新路由的路由地址 */
export const REDIRECT_PATH = '/redirect'

/** 开启页签栏后是否缓存组件 */
//export const TAB_KEEP_ALIVE = !import.meta.env.DEV;
export const TAB_KEEP_ALIVE = true

/** token本地缓存的名称 */
export const TOKEN_CACHE_NAME = 'token'

/** 主题配置本地缓存的名称 */
export const THEME_CACHE_NAME = 'theme'

/** i18n本地缓存的名称 */
export const I18N_CACHE_NAME = 'i18n-lang'

/** 高德地图key, 请到高德地图官网自行申请 */
export const MAP_KEY = '006d995d433058322319fa797f2876f5'

/** EleAdminPlus授权码 */
export const LICENSE_CODE = import.meta.env.VITE_LICENSE

/** 字典-编号类别 */
export const DIC_KEY_CODE_CATEGORY = 'code_category'

/** 字典-地域类型 */
export const DIC_KEY_REGION_TYPE = 'region_type'

/** 字典-质地类型 */
export const DIC_KEY_TEXTURE_TYPE = 'texture_type'

/** 字典-质地 */
export const DIC_KEY_TEXTURE = 'texture'

/** 字典-质量范围 */
export const DIC_KEY_QUALITY_RANGE = 'quality_range'

/** 字典-质量单位 */
export const DIC_KEY_QUALITY_UNIT = 'quality_unit'

/** 字典-数量单位 */
export const DIC_KEY_QUANTITY_UNIT = 'quantity_unit'

/** 字典-文物级别 */
export const DIC_KEY_CULTURAL_LEVEL = 'cultural_level'

/** 字典-藏品来源 */
export const DIC_KEY_COLLECTION_SOURCE = 'collection_source'

/** 字典-完残程度 */
export const DIC_KEY_COMPLETENESS = 'completeness'

/** 字典-保存状态 */
export const DIC_KEY_PRESERVATION_STATUS = 'preservation_status'

/** 字典-入藏日期范围 */
export const DIC_KEY_ACQUISITION_DATE_RANGE = 'acquisition_date_ran'

/** 字典-颜色类别 */
export const DIC_KEY_COLOR_CATEGORY = 'color_category'

/** 字典-藏品状态 */
export const DIC_KEY_COLLECTION_STATUS = 'collection_status'

/** 字典-机构类型 */
export const DIC_KEY_ORGANIZATION_TYPE = 'organization_type'

/** 字典-性别 */
export const DIC_KEY_SEX = 'sex'

/** 字典-藏品类型 */
export const DIC_KEY_COLLECTION_TYPE = 'collection_type'

/** 字典-人文类型 */
export const DIC_KEY_HUMANITIES_TYPE = 'humanities_type'

/** 字典-文本类型 */
export const DIC_KEY_TEXT_TYPE = 'text_type'

/** 字典-声像载体类型 */
export const DIC_KEY_AUDIOVISUAL_CARRIER_TYPE = 'carrier_type'

/** 字典-提借类型 */
export const DIC_KEY_BORROW_TYPE = 'borrow_type'
