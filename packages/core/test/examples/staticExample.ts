import { Project, Component } from '../../src/types'

export const Button: Component = {
  name: 'Button',
  props: [{ name: 'onClick' }],
  states: [],
  effects: [],
  declarations: [
    {
      name: 'label',
      value: {
        type: 'operation',
        name: 'concat',
        arguments: [
          { type: 'literal', value: 'Hello' },
          { type: 'literal', value: 'World' },
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
