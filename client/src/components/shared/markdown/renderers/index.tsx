import React from 'react'
import headingRenderer from './heading'
import linkRenderer from './link'
import codeRenderer from './code'
import inlineCodeRenderer from './inline-code'
import tableRenderer from './table'
import tableCellRenderer from './table-cell'
import thematicBreakRenderer from './thematic-break'
import listRenderer from './list'

const renderers = {
  heading: headingRenderer,
  link: linkRenderer,
  code: codeRenderer,
  inlineCode: inlineCodeRenderer,
  table: tableRenderer,
  tableCell: tableCellRenderer,
  thematicBreak: thematicBreakRenderer,
  list: listRenderer,
  html: (props) => <p>{props.value}</p>,
}

export default renderers
