import React from 'react'
import InputWrapper from './input-wrapper'
import Label from './label'
import Error from './error'
import SelectWrapper from './select-wrapper'
import Input from './input'
import RadioGroup from './radio-group'

const VariableField = (field) => {
  switch (field.type) {
    case 'select':
      return (
        <InputWrapper>
          <Label>{field.label}</Label>
          {field.meta.touched && field.meta.error && (
            <Error>{field.meta.error}</Error>
          )}
          <SelectWrapper>
            <Input {...field.input} as="select" type="select">
              {field.children}
            </Input>
          </SelectWrapper>
        </InputWrapper>
      )

    case 'radiogroup':
      return (
        <InputWrapper>
          <RadioGroup field={field} />
        </InputWrapper>
      )

    case 'textarea':
      return (
        <InputWrapper>
          <Label>{field.label}</Label>
          {field.meta.touched && field.meta.error && (
            <Error>{field.meta.error}</Error>
          )}
          <Input
            {...field.input}
            as="textarea"
            rows="6"
            error={field.meta.touched && !!field.meta.error}
            placeholder={field.label}
          />
        </InputWrapper>
      )

    default:
      return (
        <InputWrapper>
          <Label>{field.label}</Label>
          {field.meta.touched && field.meta.error && (
            <Error>{field.meta.error}</Error>
          )}
          <Input
            {...field.input}
            error={field.meta.touched && !!field.meta.error}
            type={field.type}
            placeholder={field.label}
            autoComplete="off"
          />
        </InputWrapper>
      )
  }
}

const renderField = (field) => <VariableField {...field} />

export default renderField
