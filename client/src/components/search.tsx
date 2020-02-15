import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components/macro'
import { debounce } from 'lodash'
import { transition } from './shared/helpers'
import { setSearch, clearSearch } from '../actions/filter-search'

const Wrapper = styled.div`
  flex-direction: row;
  ${(props) =>
    props.header
      ? `
  @media (min-width: 580px) {
    display: flex;
  }
  @media (max-width: 580px) {
    display: none;
  }
  `
      : `
  padding-top: 16px;
  input {
    max-width: calc(100% - 20px);
  }
  @media (max-width: 580px) {
    display: flex;
  }
  @media (min-width: 580px) {
    display: none;
  }
  `}
`

const Clear = styled.span`
  margin-top: auto;
  padding-left: 8px;
  margin-bottom: auto;
  cursor: pointer;
  color: ${(props) => props.theme.mutedText}:;
`
const Input = styled.input`
  ${transition('border', 'box-shadow')};

  --border: ${(props) =>
    props.error ? props.theme.error : props.theme.accent};
  --shadow: ${(props) =>
    `${props.error ? props.theme.error : props.theme.accent}4d`};

  display: block;
  ${(props) =>
    props.error
      ? `
    border: 1px solid var(--border)
    `
      : `
    border: 1px solid ${props.theme.border}
  `};
  border-radius: 3px;
  width: 100%;
  max-width: 300px;
  padding: 8px;
  background-color: ${(props) => props.theme.inputBackground};
  font-size: 15px;
  color: ${(props) => props.theme.normalText};
  appearance: none;
  outline: none;
  resize: vertical;

  :hover,
  :focus {
    border: 1px solid var(--border);
  }

  :focus {
    box-shadow: 0 0 0 2px var(--shadow);
  }
`

type SearchProps = {
  setSearch: (search: string) => void
  clearSearch: () => void
  header: boolean
}

type SearchState = {
  search: string
}

export class Search extends React.Component<SearchProps, SearchState> {
  state = {
    search: '',
  }

  updateSearch = debounce((search) => {
    this.props.setSearch(search)
  }, 500)

  handleChange = (e) => {
    const search = e.target.value
    this.setState({ search })
    this.updateSearch(search)
  }

  clearSearch = () => {
    this.setState({ search: '' })
    this.props.clearSearch()
  }

  render() {
    return (
      <Wrapper header={this.props.header}>
        <Input
          onChange={this.handleChange}
          type="search"
          placeholder="Search"
          value={this.state.search}
        />
        <Clear onClick={this.clearSearch}>x</Clear>
      </Wrapper>
    )
  }
}

const mapDispatchToProps = {
  setSearch,
  clearSearch,
}

export default connect(null, mapDispatchToProps)(Search)
