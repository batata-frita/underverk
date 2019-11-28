import { Project, Component } from '../../src/types'

export const Button: Component = {
  name: 'Button',
  props: [{ name: 'onClick' }],
  literals: [
    { name: 'hello', value: 'Hello' },
    { name: 'world', value: 'World' },
  ],
  getContexts: [],
  functions: [],
  computed: [
    {
      name: 'label',
      operation: 'concat',
      arguments: [
        { type: 'reference', value: 'hello' },
        { type: 'reference', value: 'world' },
      ],
    },
  ],
  effects: [],
  setContexts: [],
  children: [
    {
      type: 'staticNode',
      element: 'div',
      props: [],
      children: [{ type: 'reference', value: 'label' }],
    },
  ],
}

export const project: Project = {
  name: 'My components',
  root: 'Button',
  components: [Button],
  contexts: [],
}
