import {
  Component,
  ReferenceType,
  Argument,
  Literal,
  Computed,
  Function,
  State,
  UpdateFunction,
  Reference,
  LiteralValue,
  ContextGetter,
  ContextSetter,
  Operation,
  Expression,
} from './types'

export const isArgument = (reference: string, args: Argument[]): boolean => {
  if (args.length === 0) {
    return false
  }

  const [head, ...tail] = args
  if (head.name === reference) {
    return true
  }

  return isProp(reference, tail)
}

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

export const getReferenceType = (reference: string, componentAst: Component): ReferenceType | undefined => {
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

  return undefined
}

export const getReferenceTypeWithinFunction = (
  reference: string,
  functionName: string,
  componentAst: Component,
): ReferenceType | undefined => {
  const functionDefinition = componentAst.functions.find(({ name }) => name === functionName)
  if (functionDefinition && isArgument(reference, functionDefinition.arguments)) {
    return 'argument'
  }

  return getReferenceType(reference, componentAst)
}

export const createReference = (value: string): Reference => ({
  type: 'reference',
  value,
})

export const createLiteral = (name: string, value: LiteralValue): Literal => ({
  name,
  value,
})

export const createArgument = (name: string): Argument => ({
  name,
})

export const createComponent = (name: string): Component => ({
  name,
  props: [],
  literals: [],
  getContexts: [],
  functions: [],
  computed: [],
  effects: [],
  setContexts: [],
  children: [],
})

export const createContextGetter = (name: string, context: string): ContextGetter => ({
  name,
  context,
})

export const createContextSetter = (value: string, context: string): ContextSetter => ({
  value,
  context,
})

export const createFunction = (name: string): Function => ({
  name,
  arguments: [],
  composition: [],
})

export const createOperation = (name: string): Operation => ({
  type: 'operation',
  name,
  arguments: [],
})

export const createComputed = (name: string, operation: string): Computed => ({
  operation,
  name,
  arguments: [],
})

export const createUpdateFunction = (name: string, transformation: string): UpdateFunction => ({
  name,
  transformation,
})

export const createState = (defaultValue: Expression): State => ({
  defaultValue,
  updateFunctions: [],
})
