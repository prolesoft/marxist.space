import * as React from 'react'
import styled from 'styled-components/macro'
import { link } from '../shared/helpers'

export const AboutSection = styled.article`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  font-size: 14px;
  padding: 0 16px;
  flex: 1;
  min-width: 0;

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
  <AboutSection>
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
      are welcome.
    </p>
  </AboutSection>
)

export default About
