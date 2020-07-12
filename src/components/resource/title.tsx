import * as React from 'react'
import styled from 'styled-components/macro'
import { link } from '../shared/helpers'

const A = styled.a`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  line-height: 21px;
  font-weight: 500;
  text-decoration: none;
  color: ${(props) => props.theme.normalText};

  ${link({ underline: true })};

  small {
    font-size: 12px;
  }
`

type Props = {
  title: string
  href: string
  description?: string
}

const Title = ({ title, href, description }: Props) => (
  <A target="_blank" rel="nofollow noopener noreferrer" href={href}>
    {title}
    {description ? <small>{description}</small> : null}
  </A>
)

export default Title
