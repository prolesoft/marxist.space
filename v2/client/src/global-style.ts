import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    height: 100%;
  }

  body {
    min-height: 100%;
    padding-bottom: 48px;
    font-family: 'IBM Plex Sans', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  body {
    background-color: ${(props) => props.theme.pageBackground};
  }
`

export default GlobalStyle
