import { Component, ReferenceType, Argument, Literal, Computed, Function, State, UpdateFunction } from './types'

export const isProp = (reference: string, props: Argument[]): boolean => {
  if (props.length === 0) {
    return false
  }

  const [head, ...tail] = props
  if (head.name === reference) {
    return true
  }

  return isProp(reference, tail)
}

export const isLiteral = (reference: string, literalAst: Literal[]): boolean => {
  if (literalAst.length === 0) {
    return false
  }

  const [head, ...tail] = literalAst
  if (head.name === reference) {
    return true
  }

  return isLiteral(reference, tail)
}

export const isComputed = (reference: string, computedAst: Computed[]): boolean => {
  if (computedAst.length === 0) {
    return false
  }

  const [head, ...tail] = computedAst
  if (head.name === reference) {
    return true
  }

  return isComputed(reference, tail)
}

export const isFunction = (reference: string, functionAst: Function[]): boolean => {
  if (functionAst.length === 0) {
    return false
  }

  const [head, ...tail] = functionAst
  if (head.name === reference) {
    return true
  }

  return isFunction(reference, tail)
}

const isUpdateFunction = (reference: string, updateFunctionAst: UpdateFunction[]): boolean => {
  if (updateFunctionAst.length === 0) {
    return false
  }

  const [head, ...tail] = updateFunctionAst
  if (head.name === reference) {
    return true
  }

  return isUpdateFunction(reference, tail)
}

export const isUpdateFunctionInState = (reference: string, stateAst?: State): boolean => {
  if (stateAst === undefined) {
    return false
  }

  return isUpdateFunction(reference, stateAst.updateFunctions)
}

export const getReferenceType = (reference: string, componentAst: Component): ReferenceType => {
  if (isProp(reference, componentAst.props)) {
    return 'prop'
  }

  if (isLiteral(reference, componentAst.literals)) {
    return 'literal'
  }

  if (isComputed(reference, componentAst.computed)) {
    return 'computed'
  }

  if (isFunction(reference, componentAst.functions)) {
    return 'function'
  }

  if (isUpdateFunctionInState(reference, componentAst.state)) {
    return 'updateFunction'
  }

  return 'prop'
}
