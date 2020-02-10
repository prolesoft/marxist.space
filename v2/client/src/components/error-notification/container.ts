import { connect } from 'react-redux'
import ErrorNotification from './component'

const mapStateToProps = (state) => ({ error: state.error })

const ErrorNotificationContainer = connect(mapStateToProps)(ErrorNotification)

export default ErrorNotificationContainer
