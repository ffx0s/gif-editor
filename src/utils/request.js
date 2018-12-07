import axios from 'axios'

// create an axios instance
const service = axios.create({
  withCredentials: true,
  // timeout: 10000,
  baseURL: '/app'
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  response => response.data,
  error => {
    const response = error.response
    if (response.status !== 200) {
      alert(response.data.message || error.message)
      return Promise.reject(error)
    }
  }
)

export default service
