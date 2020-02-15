import React from 'react'
import styled from 'styled-components/macro'
import TagList from './tag-list'

const Wrapper = styled.aside`
  margin-bottom: 16px;
  margin-right: 16px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 2px;
  background-color: ${(props) => props.theme.foreground};

  @media (min-width: 769px) {
    max-width: 300px;
  }

  @media (max-width: 768px) {
    margin-right: 0;
    margin-top: 16px;
  }
`

const TagListWrapper = () => (
  <Wrapper>
    <TagList />
  </Wrapper>
)

export default TagListWrapper
