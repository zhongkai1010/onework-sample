import { mock } from 'mockjs'
import type { MockMethod } from 'vite-plugin-mock'

interface Artist {
  id: number
  name: string
  gender: string
  ethnicity: string
  hometown: string
  artStyle: string
  mentor: string
  graduation: string
  education: string
  currentInstitution: string
  portrait: string
}

// 生成模拟数据
const artistList: Artist[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: mock('@cname'),
  gender: mock('@pick(["男", "女"])'),
  ethnicity: mock('@pick(["汉族", "满族", "蒙古族", "回族", "藏族"])'),
  hometown: mock('@city'),
  artStyle: mock('@pick(["写实主义", "印象派", "抽象派", "现代主义", "后现代主义"])'),
  mentor: mock('@cname'),
  graduation: mock('@date("yyyy年") + " " + @pick(["中央美术学院", "中国美术学院", "清华大学美术学院", "鲁迅美术学院", "四川美术学院"])'),
  education: mock('@pick(["本科", "硕士", "博士"])'),
  currentInstitution: mock('@company'),
  portrait: mock('@image("200x200", "#50B347", "#FFF", "Artist")')
}))

export default [
  // 查询艺术家分页列表
  {
    url: '/api/artist/artist',
    method: 'get',
    response: ({ query }) => {
      let data = [...artistList]

      // 按名称筛选
      if (query.name) {
        data = data.filter((item) => item.name.includes(query.name))
      }
      // 按性别筛选
      if (query.gender) {
        data = data.filter((item) => item.gender === query.gender)
      }
      // 按民族筛选
      if (query.ethnicity) {
        data = data.filter((item) => item.ethnicity === query.ethnicity)
      }
      // 按籍贯筛选
      if (query.hometown) {
        data = data.filter((item) => item.hometown === query.hometown)
      }
      // 按艺术风格筛选
      if (query.artStyle) {
        data = data.filter((item) => item.artStyle === query.artStyle)
      }
      // 按师承筛选
      if (query.mentor) {
        data = data.filter((item) => item.mentor === query.mentor)
      }
      // 按何时何校毕业筛选
      if (query.graduation) {
        data = data.filter((item) => item.graduation === query.graduation)
      }
      // 按学历筛选
      if (query.education) {
        data = data.filter((item) => item.education === query.education)
      }
      // 按任职单位或机构筛选
      if (query.currentInstitution) {
        data = data.filter((item) => item.currentInstitution === query.currentInstitution)
      }

      // 分页处理
      const page = parseInt(query.page) || 1
      const limit = parseInt(query.limit) || 10
      const start = (page - 1) * limit
      const end = start + limit
      const list = data.slice(start, end)

      return {
        code: 0,
        message: 'ok',
        data: {
          list,
          count: data.length
        }
      }
    }
  },

  // 查询艺术家详情
  {
    url: '/api/artist/artist/details',
    method: 'get',
    response: ({ query }) => {
      const artist = artistList.find((item) => item.id === parseInt(query.id))
      return {
        code: 0,
        message: 'ok',
        data: artist
      }
    }
  },

  // 添加艺术家
  {
    url: '/api/artist/artist',
    method: 'post',
    response: ({ body }) => {
      const id = Math.max(...artistList.map((item) => item.id)) + 1
      const newArtist: Artist = {
        ...body,
        id,
        name: body.name || mock('@cname'),
        gender: body.gender || mock('@pick(["男", "女"])'),
        ethnicity: body.ethnicity || mock('@pick(["汉族", "满族", "蒙古族", "回族", "藏族"])'),
        hometown: body.hometown || mock('@city'),
        artStyle: body.artStyle || mock('@pick(["写实主义", "印象派", "抽象派", "现代主义", "后现代主义"])'),
        mentor: body.mentor || mock('@cname'),
        graduation: body.graduation || mock('@date("yyyy年") + " " + @pick(["中央美术学院", "中国美术学院", "清华大学美术学院", "鲁迅美术学院", "四川美术学院"])'),
        education: body.education || mock('@pick(["本科", "硕士", "博士"])'),
        currentInstitution: body.currentInstitution || mock('@company'),
        portrait: body.portrait || mock('@image("200x200", "#50B347", "#FFF", "Artist")')
      }
      artistList.push(newArtist)
      return {
        code: 0,
        message: '添加成功'
      }
    }
  },

  // 修改艺术家
  {
    url: '/api/artist/artist',
    method: 'put',
    response: ({ body }) => {
      const index = artistList.findIndex((item) => item.id === body.id)
      if (index !== -1) {
        artistList[index] = {
          ...artistList[index],
          ...body
        }
      }
      return {
        code: 0,
        message: '修改成功'
      }
    }
  },

  // 删除艺术家
  {
    url: '/api/artist/artist',
    method: 'delete',
    response: ({ body }) => {
      const ids = body.ids
      if (Array.isArray(ids)) {
        ids.forEach((id) => {
          const index = artistList.findIndex((item) => item.id === id)
          if (index !== -1) {
            artistList.splice(index, 1)
          }
        })
      }
      return {
        code: 0,
        message: '删除成功'
      }
    }
  }
] as MockMethod[]
