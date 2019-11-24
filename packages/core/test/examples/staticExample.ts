import { Project, Component } from '../../src/types'

export const Button: Component = {
  name: 'Button',
  props: [{ name: 'onClick' }],
  states: [],
  effects: [],
  literals: [
    { name: 'hello', value: 'Hello' },
    { name: 'world', value: 'World' },
  ],
  compute: [
    {
      name: 'label',
      value: {
        type: 'operation',
        name: 'concat',
        arguments: [
          { type: 'reference', value: 'hello' },
          { type: 'reference', value: 'world' },
        ],
      },
    },
  ],
  children: [
    {
      type: 'node',
      element: 'div',
      props: [],
      children: [{ type: 'reference', value: 'label' }],
    },
  ],
}

export const project: Project = {
  name: 'My components',
  components: [Button],
}
