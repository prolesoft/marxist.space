import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Router, Route, Switch } from 'react-router-dom'
import theme from '../../theme'
import history from '../../util/history'
import GlobalStyle from '../../global-style'
import Header from '../header'
import ErrorNotificationContainer from '../error-notification/container'
import Home from '../home'

const App = (props) => (
  <ThemeProvider theme={theme(props.dark)}>
    <Router history={history}>
      <>
        <GlobalStyle />
        <Route component={Header} />
        <Route component={ErrorNotificationContainer} />
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </>
    </Router>
  </ThemeProvider>
)

export default App
