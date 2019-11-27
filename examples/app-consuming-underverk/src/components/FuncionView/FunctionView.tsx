import React from 'react'
import Tree, { ReactD3TreeItem } from 'react-d3-tree'
import { Function, Expression } from '@underverk/compiler'

const expressionToReactD3Item = (expressionAst: Expression): ReactD3TreeItem => {
  switch (expressionAst.type) {
    case 'operation':
      return {
        name: expressionAst.name,
        children: expressionAst.arguments.map(expression => expressionToReactD3Item(expression)),
      }
    case 'reference':
      return {
        name: expressionAst.value,
      }
  }
}

const toNestedComposition = (compositionAst: Expression[]): ReactD3TreeItem => {
  if (compositionAst.length === 0) {
    return { name: 'event' }
  }

  const [head, ...tail] = compositionAst

  switch (head.type) {
    case 'operation':
      return {
        name: head.name,
        children: [...head.arguments.map(expression => expressionToReactD3Item(expression)), toNestedComposition(tail)],
      }
    case 'reference':
      return {
        name: head.value,
      }
  }
}

const toTreeData = (functionAst: Function): ReactD3TreeItem => ({
  name: functionAst.name,
  attributes: functionAst.arguments.reduce((result, { name }) => ({ ...result, [name]: name }), {}),
  children: [toNestedComposition(functionAst.composition)],
})

export default ({ data }: { data: Function }) => {
  return <Tree data={toTreeData(data)} />
}
