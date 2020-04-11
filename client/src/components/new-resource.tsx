import * as React from 'react'
import { postJson } from 'fetchyeah'
import styled from 'styled-components/macro'
import SubmitButton from './submit-button'
import Form from './form'

const Label = styled.label`
  margin-bottom: 8px;
`

const ResourceForm = styled(Form)`
  flex-direction: column;
`

const Textarea = styled.textarea`
  resize: none;
  border-radius: 0;
  margin: 0;
  font-family: 'Proxima Nova', 'Montserrat', 'Helvetica Neue', 'Noto Sans',
    sans-serif;
`

type FormState = {
  content: string
}

export default class NewResource extends React.Component<{}, FormState> {
  state = {
    content: '',
  }

  handleChange = (e) => {
    this.setState({ content: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { content } = this.state
    postJson('/api/create-issue', {
      body: { content },
    })
      .then(() => {
        this.setState({ content: '' })
      })
      .catch((err) => {
        window.alert(err)
      })
  }

  render() {
    return (
      <ResourceForm onSubmit={this.handleSubmit}>
        <Label htmlFor="resource">Add New Resource</Label>
        <Textarea
          onChange={this.handleChange}
          id="resource"
          value={this.state.content}
          placeholder="Url, title, and tags, please"
          rows="3"
        />
        <SubmitButton type="submit" title="submit">
          Submit
        </SubmitButton>
      </ResourceForm>
    )
  }
}
