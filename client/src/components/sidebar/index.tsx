// @ts-nocheck

import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components/macro'
import { withRouter } from 'react-router-dom'
import getQueryParams from 'get-query-params'
import { setTag } from '../../actions/filter-search'
import Sidebar from './component'
import TagList from '../tag-list'
import Search from '../search'
import NewResource from '../new-resource'
import DarkButton from './dark-button'
import Button from '../shared/button'
import { headerItem } from '../shared/helpers'
import About from './about'
import Collapse from './collapse'

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
    <Collapse title="Tags">
      <TagList />
    </Collapse>
    <Collapse title="Submit New Link">
      <NewResource />
    </Collapse>
    <Collapse title="About">
      <About />
    </Collapse>
  </SidebarContentWrapper>
)

const mql = window.matchMedia('(min-width: 600px)')

type MaybeParams = {
  tags?: string
}

type ThingProps = {
  history: {
    push: (item: string) => void
  }
  location: {
    search?: string
  }
  setTag: (tag: string) => void
}

export class Thing extends React.Component<ThingProps> {
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

  componentDidMount() {
    if (this.props.location.search) {
      const params = getQueryParams(this.props.location.search) as MaybeParams
      if (params.tags) {
        const tags = params.tags.split(',')
        this.setTags(tags)
      }
    }
  }

  setTags = (tags: Array<string>) => {
    // eslint-disable-next-line fp/no-mutating-methods
    this.props.history.push(`?tags=${tags.join(',')}`)
    tags.forEach((tag) => {
      this.props.setTag(tag)
    })
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

const mapDispatchToProps = { setTag }

export default connect(null, mapDispatchToProps)(withRouter(Thing))
