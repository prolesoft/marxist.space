import * as React from 'react'
import styled from 'styled-components/macro'
import { link } from './shared/helpers'

export const AboutMainSection = styled.main`
  flex: 1;
  min-width: 0;
  margin-left: 16px;
  margin-right: 16px;

  a {
    ${link};
    text-decoration: underline;
  }

  p {
    margin-bottom: 16px;
    color: ${(props) => props.theme.normalText};
    line-height: 1.5;
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 2vw;

  @media (min-width: 500px) {
    margin: 0 5vw;
  }
`

type ExternalLinkProps = {
  href: string
  title: string
}

const ExternalLink = ({ href, title }: ExternalLinkProps) => (
  <a href={href} target="_blank" rel="nofollow noopener noreferrer">
    {title}
  </a>
)

const About = () => (
  <Wrapper>
    <AboutMainSection>
      <p>
        marxist.space is a{' '}
        <ExternalLink href="https://prolesoft.github.io" title="ProleSoft" />{' '}
        project. Check out our{' '}
        <ExternalLink
          href="https://prolesoft.github.io/blog"
          title="developer
          blog"
        />
        .
      </p>
      <p>
        This project is{' '}
        <ExternalLink
          href="https://github.com/prolesoft/marxist.space"
          title="free and open source"
        />{' '}
        under the{' '}
        <ExternalLink
          href="https://github.com/prolesoft/marxist.space/blob/master/LICENSE.md"
          title="LGPL-3.0"
        />{' '}
        license.{' '}
        <ExternalLink
          href="https://github.com/prolesoft/marxist.space/blob/master/.github/CONTRIBUTING.md"
          title="Contributions"
        />{' '}
        are welcome. You can also email{' '}
        <ExternalLink
          href="mailto:marxist.space@protonmail"
          title="marxist.space@protonmail.com"
        />{' '}
        or join the discussion on{' '}
        <ExternalLink
          href="https://matrix.to/#/!TUENHHyVTWHKRxKiSm:matrix.org?via=matrix.org"
          title="Matrix"
        />
      </p>
      <p>
        <ExternalLink
          href="https://stats.uptimerobot.com/5Alqxc0QYg"
          title="Status Page"
        />
        .
      </p>
    </AboutMainSection>
  </Wrapper>
)

export default About
