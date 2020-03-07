import { createGlobalStyle } from 'styled-components/macro'
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
    padding-bottom: 24px;
    font-family: 'Proxima Nova', 'Montserrat', 'Helvetica Neue', 'Noto Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    background-color: ${(props) => props.theme.pageBackground};
  }
`

export default GlobalStyle
