import React from 'react'
import styled from 'styled-components/macro'
import tags from '../../tags'
import SelectWrapper from '../shared/form/select-wrapper'

const Dropdown = styled.select`
  border: none;
  border-radius: 0;
  width: 100%;
  padding: 8px 16px;
  background-color: ${(props) => props.theme.foreground};
  font-size: 15px;
  color: ${(props) => props.theme.normalText};
  appearance: none;
`

type Props = {
  tag: string
  history: {
    push: (string) => void
  }
}

class TagMenuDropdown extends React.Component<Props> {
  mapTags = () =>
    ['all', ...tags].map((tag, index) => (
      <option key={index} value={tag}>
        {tag}
      </option>
    ))

  handleOnChange = (event) => {
    const tag = event.target.value
    if (tag !== this.props.tag) {
      const url = tag === 'all' ? '/' : `/a/${tag}`
      this.props.history.push(url)
    }
  }

  render() {
    return (
      <SelectWrapper flex>
        <Dropdown value={this.props.tag} onChange={this.handleOnChange}>
          {this.mapTags()}
        </Dropdown>
      </SelectWrapper>
    )
  }
}

export default TagMenuDropdown
