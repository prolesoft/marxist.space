import * as React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components/macro'
import getQueryParams from 'get-query-params'
import { transition, headerItem } from './shared/helpers'
import Button from './shared/button'
import { setSearch, clearSearch } from '../actions/filter-search'

const SubmitButton = styled(Button)`
  ${headerItem};
  cursor: pointer;

  background: ${(props) => props.theme.pageBackground};
  color: ${(props) => props.theme.normalText};

  @media (hover: hover) {
    :hover path {
      fill: ${(props) => props.theme.accent};
    }
  }
`

const Label = styled.label`
  width: 0;
  height: 0;
`

const Form = styled.form`
  margin-top: 16px;
  display: flex;
  flex-direction: row;
`

const Clear = styled(Button)`
  ${headerItem};

  background: ${(props) => props.theme.pageBackground};
  color: ${(props) => props.theme.normalText};
  padding-left: 8px;
  cursor: pointer;
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
  max-width: 170px;
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
  history: {
    push: (item: string) => void
  }
  location: {
    search?: string
  }
}

type SearchState = {
  search: string
}

type MaybeParams = {
  search?: string
}

export class Search extends React.Component<SearchProps, SearchState> {
  state = {
    search: '',
  }

  componentDidMount() {
    if (this.props.location.search) {
      const params = getQueryParams(this.props.location.search) as MaybeParams
      if (params.search) {
        this.setState({ search: params.search })
        this.props.setSearch(params.search)
      }
    }
  }

  handleChange = (e) => {
    const search = e.target.value
    this.setState({ search })
  }

  clearSearch = () => {
    this.setState({ search: '' })
    // eslint-disable-next-line fp/no-mutating-methods
    this.props.history.push('/')
    this.props.clearSearch()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.search) {
      // eslint-disable-next-line fp/no-mutating-methods
      this.props.history.push(`?search=${this.state.search}`)
      this.props.setSearch(this.state.search)
    } else {
      this.clearSearch()
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Label htmlFor="search">Search</Label>
        <Input
          onChange={this.handleChange}
          id="search"
          type="search"
          placeholder="Search"
          value={this.state.search}
        />
        <SubmitButton title="Search " type="submit">
          &#x1F50E;
        </SubmitButton>
        <Clear title="Clear Search" onClick={this.clearSearch}>
          X
        </Clear>
      </Form>
    )
  }
}

const mapDispatchToProps = {
  setSearch,
  clearSearch,
}

export default connect(null, mapDispatchToProps)(withRouter(Search))
