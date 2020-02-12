import React from 'react'
import styled from 'styled-components/macro'
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

const ResourceContentDetail = (props) => (
  <Wrapper>
    <Link to={`/a/${props.href}`}>{JSON.stringify(props)}</Link>
  </Wrapper>
)

export default ResourceContentDetail
