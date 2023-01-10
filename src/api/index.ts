
export const baseUrl = 'http://localhost:8000/info'

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
const validateStatus = function (status: number): boolean {
  return status >= 200 && status < 300 // default
}

const rConfig = {
  timeout: 5000,
  validateStatus,
  headers: {
    'Content-Type': 'application/json'
  }
}

export const sendRequest = async (
  config: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return await new Promise((reslove, reject) => {
    axios({
      ...rConfig,
      ...config
    })
      .then((res: AxiosResponse) => {
        if (res.data !== undefined) {
          reslove(res)
        } else {
          reject(new Error(`${config.url ?? ''}: null response`))
        }
      })
      .catch((error) => {
        reject(new Error(error))
      })
  })
}

export const getUserInfo = async ():Promise<any> => {
  const url = 'http://localhost:8000/info'
  const result = await sendRequest({
    url,
    method: 'get'
  })
  return result.data
}
