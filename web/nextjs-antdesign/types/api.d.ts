export interface ArticleType {
  id: string
  title: string
  categories: Array<string>
  likeCount: number
  commentCount: number
  publishTime: string
}

export interface GithubProjectType {
  id: string
  author: string
  project: string
  description: string
  language: string
  star: number
  fork: number
  url: string
}

export interface PostType {
  id: string
  content: string
  userName: Array<string>
  likeCount: number
  replyCount: number
}
