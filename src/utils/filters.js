// export { setImg } from '@/utils/upyun'
export function setImg (key, options = { protocol: '' }) {
  const prefix = 'images/'
  if (key.startsWith(prefix)) {
    const name = key.endsWith('jpg') ? '3' : '4'
    key = key.split(prefix)[1]
    return (options.protocol || '') + `//wx${name}.sinaimg.cn/large/${key}`
  }
}
