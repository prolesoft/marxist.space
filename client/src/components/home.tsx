import React from 'react'
import styled from 'styled-components/macro'
import { Route } from 'react-router-dom'
import TagMenu from './tag-menu'
import ResourceList from './resource-list'
import ResourceDetail from './resource-detail'
import Sidebar from './sidebar'

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
      <Route component={TagMenu} />
      <Route exact path="/" component={ResourceList} />
      <Route
        exact
        path="/a/:tag"
        render={({ match }) => <ResourceList tag={match.params.tag} />}
      />
      <Route
        exact
        path="/a/:tag/:resource"
        render={({ match, history }) => (
          <ResourceDetail id={match.params.resource} history={history} />
        )}
      />
    </HomeMainSection>
    <Route component={Sidebar} />
  </Wrapper>
)

export default Home
