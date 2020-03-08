// @ts-nocheck

import * as React from 'react'

const CANCEL_DISTANCE_ON_SCROLL = 20

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
    WebkitOverflowScrolling: 'touch',
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
  dragHandle: {
    zIndex: 1,
    position: 'fixed',
    top: 0,
    bottom: 0,
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
  touchCurrentX: number
  touchIdentifier: number
  touchStartX: number
}

class Sidebar extends React.Component<SidebarProps, SidebarState> {
  sidebar?: React.RefObject<HTMLDivElement>

  state = {
    dragSupported: false,
    sidebarWidth: 0,
    touchCurrentX: null,
    touchIdentifier: null,
    touchStartX: null,
  }

  componentDidMount() {
    const isIos = /iPad|iPhone|iPod/.test(navigator ? navigator.userAgent : '')
    this.setState({
      dragSupported:
        typeof window === 'object' && 'ontouchstart' in window && !isIos,
    })
    this.saveSidebarWidth()
  }

  componentDidUpdate() {
    // filter out the updates when we're touching
    if (!this.isTouching()) {
      this.saveSidebarWidth()
    }
  }

  onTouchStart = (ev) => {
    // filter out if a user starts swiping with a second finger
    if (!this.isTouching()) {
      const touch = ev.targetTouches[0]
      this.setState({
        touchIdentifier: touch.identifier,
        touchStartX: touch.clientX,
        touchCurrentX: touch.clientX,
      })
    }
  }

  onTouchMove = (ev) => {
    if (this.isTouching()) {
      // eslint-disable-next-line
      for (let ind = 0; ind < ev.targetTouches.length; ind++) {
        // we only care about the finger that we are tracking
        if (ev.targetTouches[ind].identifier === this.state.touchIdentifier) {
          this.setState({
            touchCurrentX: ev.targetTouches[ind].clientX,
          })
          break
        }
      }
    }
  }

  onTouchEnd = () => {
    if (this.isTouching()) {
      const dragToggleDistance = 30
      // trigger a change to open if sidebar has been dragged beyond dragToggleDistance
      const touchWidth = this.touchSidebarWidth()

      if (
        (this.props.open &&
          touchWidth < this.state.sidebarWidth - dragToggleDistance) ||
        (!this.props.open && touchWidth > dragToggleDistance)
      ) {
        this.props.onSetOpen(!this.props.open)
      }

      this.setState({
        touchIdentifier: null,
        touchStartX: null,
        touchCurrentX: null,
      })
    }
  }

  // This logic helps us prevents the user from sliding the sidebar horizontally
  // while scrolling the sidebar vertically. When a scroll event comes in, we're
  // cancelling the ongoing gesture if it did not move horizontally much.
  onScroll = () => {
    if (this.isTouching() && this.inCancelDistanceOnScroll()) {
      this.setState({
        touchIdentifier: null,
        touchStartX: null,
        touchCurrentX: null,
      })
    }
  }

  // True if the on going gesture X distance is less than the cancel distance
  inCancelDistanceOnScroll = () =>
    Math.abs(this.state.touchStartX - this.state.touchCurrentX) <
    CANCEL_DISTANCE_ON_SCROLL

  isTouching = () => this.state.touchIdentifier !== null

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

  // calculate the sidebarWidth based on current touch info
  touchSidebarWidth = () => {
    // if the sidebar is open and start point of drag is inside the sidebar
    // we will only drag the distance they moved their finger
    // otherwise we will move the sidebar to be below the finger.
    if (this.props.open && this.state.touchStartX < this.state.sidebarWidth) {
      if (this.state.touchCurrentX > this.state.touchStartX) {
        return this.state.sidebarWidth
      }
      return (
        // eslint-disable-next-line
        this.state.sidebarWidth -
        this.state.touchStartX +
        this.state.touchCurrentX
      )
    }
    return Math.min(this.state.touchCurrentX, this.state.sidebarWidth)
  }

  // eslint-disable-next-line
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
    const useTouch = this.state.dragSupported
    const isTouching = this.isTouching()
    const rootProps = {
      style: { ...defaultStyles.root },
      role: 'navigation',
    }
    let dragHandle

    const hasBoxShadow = isTouching || this.props.open || this.props.docked
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

    if (isTouching) {
      const percentage = this.touchSidebarWidth() / this.state.sidebarWidth

      // slide open to what we dragged
      // @ts-ignore
      sidebarStyle.transform = `translateX(-${(1 - percentage) * 100}%)`
      // @ts-ignore
      sidebarStyle.WebkitTransform = `translateX(-${(1 - percentage) * 100}%)`

      // fade overlay to match distance of drag
      overlayStyle.opacity = percentage
      overlayStyle.visibility = 'visible'
    } else if (this.props.docked) {
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

    if (isTouching) {
      sidebarStyle.transition = 'none'
      sidebarStyle.WebkitTransition = 'none'
      contentStyle.transition = 'none'
      overlayStyle.transition = 'none'
    }

    if (useTouch) {
      if (this.props.open) {
        // @ts-ignore
        rootProps.onTouchStart = this.onTouchStart
        // @ts-ignore
        rootProps.onTouchMove = this.onTouchMove
        // @ts-ignore
        rootProps.onTouchEnd = this.onTouchEnd
        // @ts-ignore
        rootProps.onTouchCancel = this.onTouchEnd
        // @ts-ignore
        rootProps.onScroll = this.onScroll
      } else {
        const dragHandleStyle = {
          ...defaultStyles.dragHandle,
        }
        // @ts-ignore
        dragHandleStyle.width = 20

        // @ts-ignore
        dragHandleStyle.left = 0

        dragHandle = (
          <div
            style={dragHandleStyle}
            onTouchStart={this.onTouchStart}
            onTouchMove={this.onTouchMove}
            onTouchEnd={this.onTouchEnd}
            onTouchCancel={this.onTouchEnd}
          />
        )
      }
    }

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    return (
      <div {...rootProps}>
        <div style={sidebarStyle} ref={this.saveSidebarRef}>
          {this.props.sidebar}
        </div>
        <div style={overlayStyle} onClick={this.overlayClicked} />
        <div style={contentStyle}>
          {dragHandle}
          {this.props.children}
        </div>
      </div>
    )
    /* eslint-enable jsx-a11y/click-events-have-key-events */
  }
}

export default Sidebar
