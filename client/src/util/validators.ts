export const checkMaxLength = (value, len) =>
  value && value.length <= len
    ? undefined
    : `must be less than ${len} characters`

export const checkMinLength = (value, len) =>
  value && value.length >= len
    ? undefined
    : `must be more than ${len} characters`

export const checkValidChars = (value) =>
  /^[a-zA-Z0-9_-]+$/.test(value) ? undefined : 'contains invalid characters'

export const checkIfTrimmed = (value) =>
  value.trim() === value ? undefined : 'cannot start or end with whitespace'

export const validUrl = (value) => {
  try {
    new URL(value)
    return undefined
  } catch (error) {
    return 'must be a valid url'
  }
}

export const max = (len) => (value) => checkMaxLength(value, len)
export const min = (len) => (value) => checkMinLength(value, len)
export const validChars = (value) => checkValidChars(value)
export const trimmed = (value) => checkIfTrimmed(value)

export const required = (value) => (value ? undefined : 'required')
export const resourceType = (value) =>
  value === 'link' || value === 'text'
    ? undefined
    : 'must be link or text resource'
export const titleValidator = (value) =>
  required(value) || checkMaxLength(value, 100)
export const textResourceValidator = (value) =>
  required(value) || checkMinLength(value, 4)
export const urlValidator = (value) => required(value) || validUrl(value)
export const typeValidator = (value) => required(value) || resourceType(value)
