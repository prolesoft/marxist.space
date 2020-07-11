import styled from 'styled-components/macro'

const Excerpt = styled.div`
  max-width: 800px;
  padding-bottom: 1px;
  padding-left: 8px;
  font-size: 13px;
  line-height: 19px;
  color: ${(props) => props.theme.mutedText};
`

export default Excerpt
