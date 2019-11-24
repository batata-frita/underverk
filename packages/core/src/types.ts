export interface Reference {
  type: 'reference'
  value: string
}

export interface Operation {
  type: 'operation'
  name: string
  arguments: Expression[]
}

export interface Function {
  type: 'function'
  arguments: Argument[]
  body: Expression
}

export type Expression = Operation | Reference | Function

export interface Argument {
  name: string
}

export interface Declaration {
  name: string
  value: Expression
}

export interface Literal {
  name: string
  value: string | number | boolean
}

export interface NodeChild {
  type: 'node'
  element: string
  props: Declaration[]
  children: Child[]
}

export type Child = NodeChild | Expression

export interface State {
  name: string
  updateFunction: string
  defaultValue: Expression
}

export interface Effect {
  type: 'log'
  dependencies: string[]
  arguments: Expression[]
}

export interface Component {
  name: string
  props: Argument[]
  children: Child[]
  states: State[]
  effects: Effect[]
  literals: Literal[]
  declarations: Declaration[]
}

export interface Project {
  name: string
  components: Component[]
}
