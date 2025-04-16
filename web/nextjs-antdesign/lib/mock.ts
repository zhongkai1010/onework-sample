export const result = (data: any) => {
  return new Response(JSON.stringify(data), { status: 200 })
}

export const success = (data: Array<any> | string | number) => {
  return {
    code: 200,
    data: data,
  }
}

export const failure = (message?: string) => {
  return {
    code: 500,
    data: null,
    msg: message ?? '请求失败',
  }
}

export const page = (data: Array<any>, total?: number) => {
  return {
    code: 200,
    data: {
      total: total ?? 1000,
      data: data,
    },
  }
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
