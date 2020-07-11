import * as React from 'react'
import { ThemeProvider } from 'styled-components/macro'
import { connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import theme from '../theme'
import history from '../util/history'
import GlobalStyle from '../global-style'
import Header from './header'
import Home from './home'
import Sidebar from './sidebar'
import { fetchTags } from '../actions/tags'

type AppProps = {
  fetchTags: () => void
}

class App extends React.Component<AppProps> {
  componentDidMount() {
    this.props.fetchTags()
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <React.Fragment>
            <GlobalStyle />
            <Sidebar>
              <Route component={Header} />
              <Switch>
                <Route path="/" component={Home} />
              </Switch>
            </Sidebar>
          </React.Fragment>
        </Router>
      </ThemeProvider>
    )
  }
}

const mapDispatchToProps = { fetchTags }

export default connect(null, mapDispatchToProps)(App)
