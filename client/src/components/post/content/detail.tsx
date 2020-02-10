import React from 'react'
import styled from 'styled-components/macro'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { link } from '../../shared/helpers'

const Wrapper = styled.div`
  font-size: 13px;
  margin-top: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  & > * {
    margin-right: 4px;
  }

  & > a {
    ${link};
  }

  & > span {
    color: ${(props) => props.theme.mutedText};
  }
`

const PostContentDetail = (props) => (
  <Wrapper>
    <Link to={`/a/${props.category}`}>/a/{props.category}</Link>
    <span>by</span>
    <span>{moment(props.created).fromNow()}</span>
  </Wrapper>
)

export default PostContentDetail
