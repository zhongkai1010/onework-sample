import axios from 'axios'

export function getArticlePageData() {
  return axios.get('/api?action=getArticlePageData')
}

export function getGithubProjectPageData() {
  return axios.get('/api?action=getGithubProjectPageData')
}

export function getPostPageData() {
  return axios.get('/api?action=getPostPageData')
}
