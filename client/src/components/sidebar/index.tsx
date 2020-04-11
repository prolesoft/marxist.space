// @ts-nocheck

import * as React from 'react'
import styled from 'styled-components/macro'
import Sidebar from './component'
import TagList from '../tag-list'
import Search from '../search'
import NewResource from '../new-resource'
import DarkButton from './dark-button'
import Button from '../shared/button'
import { headerItem } from '../shared/helpers'
import About from './about'

const ToggleWrapper = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  align-items: stretch;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px ${(props) => props.theme.shadow};
  border-bottom: 1px solid ${(props) => props.theme.border};
  height: 48px;
  background-color: ${(props) => props.theme.foreground};
  user-select: none;
  margin-bottom: 16px;
  height: 40px;

  @media (min-width: 600px) {
    display: none;
  }
`

const Toggle = styled(Button)`
  ${headerItem};

  background: ${(props) => props.theme.pageBackground};
  color: ${(props) => props.theme.normalText};
  padding: 16px;
  cursor: pointer;

  @media (hover: hover) {
    :hover path {
      fill: ${(props) => props.theme.accent};
    }
  }
`

const SidebarContentWrapper = styled.aside`
  display: flex;
  padding-top: 16px;
  flex-direction: column;
  width: 250px;
  background: ${(props) => props.theme.pageBackground};
`

const SidebarContent = () => (
  <SidebarContentWrapper>
    <DarkButton />
    <Search />
    <TagList />
    <NewResource />
    <About />
  </SidebarContentWrapper>
)

const mql = window.matchMedia('(min-width: 600px)')

export default class Thing extends React.Component {
  state = {
    docked: mql.matches,
    open: false,
  }

  UNSAFE_componentWillMount() {
    mql.addListener(this.mediaQueryChanged)
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged)
  }

  onSetOpen = (open) => {
    this.setState({ open })
  }

  mediaQueryChanged = () => {
    this.setState({
      docked: mql.matches,
      open: false,
    })
  }

  toggleOpen = (ev) => {
    if (ev) {
      ev.preventDefault()
    }

    this.setState(({ open }) => ({
      open: !open,
    }))
  }

  render() {
    const sidebar = <SidebarContent />

    const sidebarProps = {
      sidebar,
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen,
    }

    return (
      <Sidebar {...sidebarProps}>
        {!this.state.docked && (
          <ToggleWrapper>
            <Toggle onClick={this.toggleOpen}>=</Toggle>
          </ToggleWrapper>
        )}
        {this.props.children}
      </Sidebar>
    )
  }
}
