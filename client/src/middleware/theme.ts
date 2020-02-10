import { TOGGLE_DARK_THEME } from '../actions/theme'
import storage from '../util/storage'

export default () => (next) => (action) => {
  if (action.type === TOGGLE_DARK_THEME) {
    const dark = storage.getItem('dark') === 'true'
    storage.setItem('dark', (!dark).toString())
  }
  next(action)
}
