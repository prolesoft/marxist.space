import React from 'react'
import styled from 'styled-components/macro'
import { transition } from '../../helpers'
import FormWrapper from './wrapper'
import LoadingIndicatorSpinner from '../../loading-indicator/spinner'

const StyledForm = styled.form`
  ${transition('filter')};

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${(props) =>
    props.loading &&
    'filter: grayscale(0.5) blur(5px) opacity(0.6); pointer-events: none'};
`

type Props = {
  className?: string
  wide?: boolean
  loading?: boolean
  onSubmit: any
}

const Form = ({ className, wide, ...props }: Props) => (
  <FormWrapper className={className} wide={wide}>
    <StyledForm {...props} />
    {props.loading && <LoadingIndicatorSpinner />}
  </FormWrapper>
)

export default Form
