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
import About from './about'

const App = (props) => (
  <ThemeProvider theme={theme(props.dark)}>
    <Router history={history}>
      <React.Fragment>
        <GlobalStyle />
        <Route component={Header} />
        <Route component={ErrorNotification} />
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/" component={Home} />
        </Switch>
      </React.Fragment>
    </Router>
  </ThemeProvider>
)

const mapStateToProps = (state) => ({ dark: state.theme.dark })
export default connect(mapStateToProps)(App)
