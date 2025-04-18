/*
 * @Author: zhongkai zhongkai1010@163.com
 * @Date: 2025-04-14 10:12:29
 * @LastEditors: zhongkai zhongkai1010@163.com
 * @LastEditTime: 2025-04-18 15:23:47
 * @FilePath: \onework-sample\web\nextjs-antdesign\app\api\route.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DEVELOPMENT_LANGUAGE, POST_CATEGORIES } from '@/lib/constant'
import { delay, failure, page, result } from '@/lib/mock'

import Mock from 'mockjs'

export async function GET(request: Request) {
  // 使用延迟
  await delay(1000) // 延迟2秒

  const url = new URL(request.url)
  const action = url.searchParams.get('action') // 获取查询参数 "action"

  switch (action) {
    case 'getArticlePageData':
      return result(
        page(
          Mock.mock({
            'list|50': [
              {
                'id|+1': '@id()',
                title: '@ctitle(2, 200)', // 随机生成 5 到 20 个字符的标题
                'categories|2': [
                  '@pick(' + JSON.stringify(POST_CATEGORIES) + ')',
                ], // 随机生成 2 到 5 个字母的分类
                'likeCount|0-1000': 0, // 随机生成 0 到 1000 的点赞数
                'commentCount|0-500': 0, // 随机生成 0 到 500 的评论数
                publishTime: '@datetime', // 随机生成一个日期时间字符串
              },
            ],
          }).list,
          200
        )
      )
    case 'getGithubProjectPageData':
      return result(
        page(
          Mock.mock({
            'list|50': [
              {
                'id|+1': '@id()',
                author: '@name()',
                project: '@word()', // 随机生成 5 到 20 个字符的标题
                description: '@cparagraph(2,100)',
                star: '@integer(0, 1000)',
                fork: '@integer(0, 500)',
                language: '@pick(' + JSON.stringify(DEVELOPMENT_LANGUAGE) + ')',
                url: '@url()',
              },
            ],
          }).list,
          200
        )
      )
    case 'getPostPageData':
      return result(
        page(
          Mock.mock({
            'list|50': [
              {
                'id|+1': '@id()',
                userName: '@name()',
                content: '@cparagraph(2,100)',
                likeCount: '@integer(0, 10)',
                replyCount: '@integer(0, 5)',
              },
            ],
          }).list,
          200
        )
      )

    default:
      return result(failure())
  }
}
