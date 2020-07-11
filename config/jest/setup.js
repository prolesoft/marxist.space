import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-styled-components'
import matchMediaPolyfill from 'mq-polyfill'

Enzyme.configure({ adapter: new Adapter() })

matchMediaPolyfill(window)
