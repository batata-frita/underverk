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
  value: Expression
}

export interface Literal {
  name: string
  value: string | number | boolean | object
}

export interface Function {
  name: string
  arguments: Argument[]
  composition: Operation[]
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

export type Child = StaticNodeChild | DynamicNodeChild | Expression

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
  functions: Function[]
  state?: State
  computed: Computed[]

  effects: Effect[]
  children: Child[]
}

export interface Project {
  name: string
  components: Component[]
}
