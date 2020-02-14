import React from 'react'
import styled from 'styled-components/macro'
import { overflow, link } from '../../shared/helpers'

const Wrapper = styled.div`
  display: flex;

  * {
    ${overflow};

    display: block;
    font-size: 16px;
    line-height: 21px;
    font-weight: 500;
    text-decoration: none;
    color: ${(props) => props.theme.normalText};
  }

  a {
    ${link({ underline: true })};
  }

  small {
    font-size: 12px;
  }
`

type Props = {
  title: string
  href: string
  subtitle?: string
}

const Title = ({ title, href, subtitle }: Props) => (
  <Wrapper>
    <a target="_blank" rel="nofollow noopener noreferrer" href={href}>
      {title}
      {subtitle ? <small>{subtitle}</small> : null}
    </a>
  </Wrapper>
)

export default Title
