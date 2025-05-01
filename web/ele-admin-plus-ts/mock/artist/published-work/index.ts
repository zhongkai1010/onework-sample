import { MockMethod } from 'vite-plugin-mock'
import { Random } from 'mockjs'

interface Publication {
  id: number
  bookTitle: string
  artistName: string
  publisher: string
  format: string
  author: string
  edition: string
  coverImage: string
  price: number
}

// 生成随机数量的出版著作数据
const generatePublications = (count: number): Publication[] => {
  const publications: Publication[] = []
  for (let i = 0; i < count; i++) {
    publications.push({
      id: Random.integer(1, 10000),
      bookTitle: Random.ctitle(5, 20),
      artistName: Random.cname(),
      publisher: Random.ctitle(5, 10) + '出版社',
      format: Random.pick(['16开', '32开', '64开']),
      author: Random.cname(),
      edition: Random.integer(1, 5).toString(),
      coverImage: Random.image('200x300', Random.color(), Random.word(2)),
      price: Random.float(20, 200, 2)
    })
  }
  return publications
}

// 生成 30-80 条随机数据
const publications = generatePublications(Random.integer(30, 80))

export default [
  {
    url: '/api/artist/published-work',
    method: 'get',
    response: ({ query }) => {
      const { page = 1, limit = 10, bookTitle, artistName } = query

      // 过滤数据
      let filteredData = [...publications]
      if (bookTitle) {
        filteredData = filteredData.filter((item) => item.bookTitle.includes(bookTitle))
      }
      if (artistName) {
        filteredData = filteredData.filter((item) => item.artistName.includes(artistName))
      }

      // 分页
      const start = (page - 1) * limit
      const end = start + limit
      const pageData = filteredData.slice(start, end)

      return {
        code: 0,
        data: {
          list: pageData,
          total: filteredData.length
        },
        message: 'success'
      }
    }
  },
  {
    url: '/api/artist/published-work/details',
    method: 'get',
    response: ({ query }) => {
      const { id } = query
      const publication = publications.find((item) => item.id === Number(id))
      if (publication) {
        return {
          code: 0,
          data: publication,
          message: 'success'
        }
      }
      return {
        code: 1,
        message: '未找到该出版著作'
      }
    }
  },
  {
    url: '/api/artist/published-work',
    method: 'post',
    response: ({ body }) => {
      const newPublication: Publication = {
        id: Random.integer(1, 10000),
        bookTitle: body.bookTitle,
        artistName: body.artistName,
        publisher: body.publisher,
        format: body.format,
        author: body.author,
        edition: body.edition,
        coverImage: body.coverImage,
        price: body.price
      }
      publications.unshift(newPublication)
      return {
        code: 0,
        data: newPublication,
        message: '添加成功'
      }
    }
  },
  {
    url: '/api/artist/published-work',
    method: 'put',
    response: ({ body }) => {
      const index = publications.findIndex((item) => item.id === body.id)
      if (index !== -1) {
        publications[index] = {
          ...publications[index],
          ...body
        }
        return {
          code: 0,
          data: publications[index],
          message: '更新成功'
        }
      }
      return {
        code: 1,
        message: '未找到该出版著作'
      }
    }
  },
  {
    url: '/api/artist/published-work',
    method: 'delete',
    response: ({ body }) => {
      const ids = body.ids || []
      const successIds: number[] = []
      const failIds: number[] = []

      ids.forEach((id: number) => {
        const index = publications.findIndex((item) => item.id === id)
        if (index !== -1) {
          publications.splice(index, 1)
          successIds.push(id)
        } else {
          failIds.push(id)
        }
      })

      if (failIds.length > 0) {
        return {
          code: 1,
          message: `部分删除失败，未找到ID为 ${failIds.join(',')} 的出版著作`
        }
      }

      return {
        code: 0,
        message: '删除成功'
      }
    }
  }
] as MockMethod[]
