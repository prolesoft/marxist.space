import React from 'react'
import styled from 'styled-components/macro'
import SelectWrapper from '../shared/form/select-wrapper'
import { connect } from 'react-redux'
import { fetchTags } from '../../actions/tags'

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
  tags: string[0]
  history: {
    push: (string) => void
  }
}

class TagMenuDropdown extends React.Component<Props> {
  mapTags = () =>
    ['all', ...this.props.tags].map((tag, index) => (
      <option key={index} value={tag}>
        {tag}
      </option>
    ))

  handleOnChange = (event) => {
    const tag = event.target.value
    if (tag !== this.props.tag) {
      const url = tag === 'all' ? '/' : `/a/${tag}`
      // eslint-disable-next-line fp/no-mutating-methods
      this.props.history.push(url)
    }
  }

  componentDidMount() {
    this.props.fetchTags()
  }

  render() {
    return this.props.isFetching ? null : (
      <SelectWrapper flex>
        <Dropdown
          value={this.props.tags.toString()}
          onChange={this.handleOnChange}
        >
          {this.mapTags()}
        </Dropdown>
      </SelectWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  tags: state.tags.items,
  isFetching: state.tags.isFetching,
})

const mapDispatchToProps = { fetchTags }

export default connect(mapStateToProps, mapDispatchToProps)(TagMenuDropdown)
