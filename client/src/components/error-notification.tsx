import React from 'react'
import styled from 'styled-components/macro'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { transition, smallFont } from './shared/helpers'
import { connect } from 'react-redux'

export const ErrorNotificationMessage = styled.div`
  ${smallFont};

  position: relative;
  display: inline-block;
  padding: 12px 32px;
  background-color: #ffffff;
  color: ${(props) => props.theme.error};
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.border};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);

  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-top: 2px solid ${(props) => props.theme.error};
    border-radius: 2px 2px 0 0;
  }
`

const className = 'message'

const Wrapper = styled.div`
  ${transition('opacity', 'transform')};

  position: fixed;
  top: 16px;
  left: 0;
  right: 0;
  z-index: 100;
  text-align: center;
  pointer-events: none;

  &.${className}-enter {
    opacity: 0;
    transform: translateY(-25%);
  }

  &.${className}-enter-active {
    opacity: 1;
    transform: translateY(0);
  }

  &.${className}-exit {
    opacity: 1;
  }

  &.${className}-exit-active {
    opacity: 0;
  }
`

export class ErrorNotification extends React.Component {
  render() {
    return (
      <TransitionGroup component={null}>
        {this.props.error && (
          <CSSTransition classNames={className} timeout={300}>
            <Wrapper>
              <ErrorNotificationMessage>
                {this.props.error.message}
              </ErrorNotificationMessage>
            </Wrapper>
          </CSSTransition>
        )}
      </TransitionGroup>
    )
  }
}

const mapStateToProps = (state) => ({ error: state.error })
export default connect(mapStateToProps)(ErrorNotification)
