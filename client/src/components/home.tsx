import * as React from 'react'
import styled from 'styled-components/macro'
import { Route } from 'react-router-dom'
import ResourceList from './resource-list'
import TagList from './tag-list'
import Search from './search'

export const HomeMainSection = styled.main`
  flex: 1;
  min-width: 0;
`

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 10vw;

  @media (max-width: 1024px) {
    margin: 0 5vw;
  }

  @media (max-width: 768px) {
    display: block;
    margin: 0;
  }
`

const Home = () => (
  <Wrapper>
    <HomeMainSection>
      <Route exact path="/" component={ResourceList} />
    </HomeMainSection>
    <TagList />
    <Search />
  </Wrapper>
)

export default Home
