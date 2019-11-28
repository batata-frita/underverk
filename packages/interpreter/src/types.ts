export interface Reference {
  type: 'reference'
  value: string
}

export interface Operation {
  type: 'operation'
  name: string
  arguments: Expression[]
}

export type Expression = Operation | Reference

export interface Argument {
  name: string
}

export interface Declaration {
  name: string
  value: Reference
}

export interface ContextGetter {
  name: string
  context: string
}

export interface ContextSetter {
  context: string
  value: string
}

export type LiteralValue = string | number | boolean | object | undefined

export interface Literal {
  name: string
  value: LiteralValue
}

export interface Function {
  name: string
  arguments: Argument[]
  composition: Expression[]
}

export interface StaticNodeChild {
  type: 'staticNode'
  element: string
  props: Declaration[]
  children: Child[]
}

export interface DynamicNodeChild {
  type: 'dynamicNode'
  element: string
  dependency: string
}

export type Child = StaticNodeChild | DynamicNodeChild | Reference

export interface UpdateFunction {
  name: string

  // this points to a function
  transformation: string
}

export interface State {
  updateFunctions: UpdateFunction[]
  defaultValue: Expression
}

export interface Effect {
  type: 'log'
  dependency: string
  handler: string
}

export interface Computed {
  name: string
  operation: string
  arguments: Reference[]
}

export interface Component {
  name: string
  props: Argument[]

  literals: Literal[]
  getContexts: ContextGetter[]
  functions: Function[]
  state?: State
  computed: Computed[]

  effects: Effect[]
  setContexts: ContextSetter[]
  children: Child[]
}

export interface Context {
  name: string
  defaultValue: LiteralValue
}

export interface Project {
  name: string
  root: string
  components: Component[]
  contexts: Context[]
}

export type ReferenceType = 'literal' | 'prop' | 'computed' | 'function' | 'updateFunction' | 'argument'
