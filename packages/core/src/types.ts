export interface Literal {
  type: 'literal'
  value: string | number | boolean
}

export interface Reference {
  type: 'reference'
  value: string
}

export interface Operation {
  type: 'operation'
  name: string
  arguments: Expression[]
}

export type Expression = Operation | Literal | Reference

export interface PropType {
  name: string
}

export interface Declaration {
  name: string
  value: Expression
}

export interface NodeChild {
  type: 'node'
  element: Expression
  props: Declaration[]
  children: Child[]
}

type Child = NodeChild | Expression

export interface Component {
  name: string
  props: PropType[]
  children: Child[]
  declarations: Declaration[]
}

export interface Project {
  name: string
  components: Component[]
}
