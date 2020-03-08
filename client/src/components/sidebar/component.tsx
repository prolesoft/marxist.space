// @ts-nocheck

import * as React from 'react'

const defaultStyles = {
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  sidebar: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    transition: 'transform .3s ease-out',
    WebkitTransition: '-webkit-transform .3s ease-out',
    willChange: 'transform',
    overflowY: 'auto',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: 'auto',
    transition: 'left .3s ease-out, right .3s ease-out',
  },
  overlay: {
    zIndex: 1,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity .3s ease-out, visibility .3s ease-out',
    backgroundColor: 'rgba(0,0,0,.3)',
  },
}

type SidebarProps = {
  docked?: boolean
  onSetOpen: (open: boolean) => void
  open?: boolean
  shadow?: boolean
  sidebar?: React.ReactNode
}

type SidebarState = {
  dragSupported: boolean
  sidebarWidth: number
}

class Sidebar extends React.Component<SidebarProps, SidebarState> {
  sidebar?: React.RefObject<HTMLDivElement>

  state = {
    dragSupported: false,
    sidebarWidth: 0,
  }

  componentDidMount() {
    this.saveSidebarWidth()
  }

  componentDidUpdate() {
    this.saveSidebarWidth()
  }

  overlayClicked = () => {
    if (this.props.open) {
      this.props.onSetOpen(false)
    }
  }

  saveSidebarWidth = () => {
    if (this.sidebar) {
      // @ts-ignore
      const width = this.sidebar.offsetWidth

      if (width !== this.state.sidebarWidth) {
        this.setState({ sidebarWidth: width })
      }
    }
  }

  saveSidebarRef = (node) => {
    this.sidebar = node
  }

  render() {
    const sidebarStyle = {
      ...defaultStyles.sidebar,
    }
    const contentStyle = {
      ...defaultStyles.content,
    }
    const overlayStyle = {
      ...defaultStyles.overlay,
    }
    const rootProps = {
      style: { ...defaultStyles.root },
      role: 'navigation',
    }

    const hasBoxShadow = this.props.open || this.props.docked
    // @ts-ignore
    sidebarStyle.left = 0
    // @ts-ignore
    sidebarStyle.transform = 'translateX(-100%)'
    // @ts-ignore
    sidebarStyle.WebkitTransform = 'translateX(-100%)'
    if (hasBoxShadow) {
      // @ts-ignore
      sidebarStyle.boxShadow = '2px 2px 4px rgba(0, 0, 0, 0.15)'
    }

    if (this.props.docked) {
      // show sidebar
      if (this.state.sidebarWidth !== 0) {
        // @ts-ignore
        sidebarStyle.transform = `translateX(0%)`
        // @ts-ignore
        sidebarStyle.WebkitTransform = `translateX(0%)`
      }

      // make space on the left side of the content for the sidebar
      // @ts-ignore
      contentStyle.left = `${this.state.sidebarWidth}px`
    } else if (this.props.open) {
      // slide open sidebar
      // @ts-ignore
      sidebarStyle.transform = `translateX(0%)`
      // @ts-ignore
      sidebarStyle.WebkitTransform = `translateX(0%)`

      // show overlay
      overlayStyle.opacity = 1
      overlayStyle.visibility = 'visible'
    }

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    return (
      <div {...rootProps}>
        <div style={sidebarStyle} ref={this.saveSidebarRef}>
          {this.props.sidebar}
        </div>
        <div style={overlayStyle} onClick={this.overlayClicked} />
        <div style={contentStyle}>{this.props.children}</div>
      </div>
    )
    /* eslint-enable jsx-a11y/click-events-have-key-events */
  }
}

export default Sidebar
