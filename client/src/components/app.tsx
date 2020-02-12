import React from 'react'
import { ThemeProvider } from 'styled-components'
import { connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import theme from '../theme'
import history from '../util/history'
import GlobalStyle from '../global-style'
import Header from './header'
import ErrorNotification from './error-notification'
import Home from './home'

const App = (props) => (
  <ThemeProvider theme={theme(props.dark)}>
    <Router history={history}>
      <>
        <GlobalStyle />
        <Route component={Header} />
        <Route component={ErrorNotification} />
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </>
    </Router>
  </ThemeProvider>
)

const mapStateToProps = (state) => ({ dark: state.theme.dark })
export default connect(mapStateToProps)(App)
