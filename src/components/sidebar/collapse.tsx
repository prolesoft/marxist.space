import * as React from 'react'
import styled from 'styled-components/macro'

const CollapseHeader = styled.div`
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.foreground};
  color: ${(props) => props.theme.normalText};
  padding: 16px;
  margin: 4px 0;
`

type CollapseState = {
  open: boolean
}

type CollapseProps = {
  title: string
  children: React.ReactNode
}

const up = '\u2303'
const down = '\u2304'

export default class Collapse extends React.Component<
  CollapseProps,
  CollapseState
> {
  state = {
    open: false,
  }

  toggle = () => {
    this.setState(({ open }) => ({ open: !open }))
  }

  render() {
    return (
      <React.Fragment>
        <CollapseHeader onClick={this.toggle}>
          {`${this.state.open ? up : down} ${this.props.title}`}
        </CollapseHeader>
        {this.state.open ? (
          <React.Fragment>{this.props.children}</React.Fragment>
        ) : null}
      </React.Fragment>
    )
  }
}
