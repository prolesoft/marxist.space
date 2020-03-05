export const getQueryParams = (search = '') => {
  const params = {}
  search
    .substring(1) // remove leading '?'
    .split('&')
    .filter((value) => value.trim().length)
    .forEach((part) => {
      const [key, value] = part.split('=')
      params[key.toLowerCase()] = decodeURIComponent(value)
    })
  return params
}

