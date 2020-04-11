import * as React from 'react'
import styled from 'styled-components/macro'
import { Route } from 'react-router-dom'
import ResourceList from './resource-list'

export const HomeMainSection = styled.main`
  flex: 1;
  min-width: 0;
`

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin: 0 16px;

  @media (min-width: 600px) {
    flex-direction: row;
    margin: 0 42px;
  }
`

const Home = () => (
  <Wrapper>
    <HomeMainSection>
      <Route exact path="/" component={ResourceList} />
    </HomeMainSection>
  </Wrapper>
)

export default Home
