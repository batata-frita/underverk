import { Project, Component } from '../../src/types'

export const Button: Component = {
  name: 'Button',
  props: [
    { name: 'onClick' },
    { name: 'thing' },
    { name: 'greeting' },
    { name: 'textColor' }
  ],
  literals: [
    { name: 'colorKey', value: 'color' },
  ],
  getContexts: [],
  functions: [],
  computed: [
    {
      name: 'label',
      operation: 'concat',
      arguments: [
        { type: 'reference', value: 'greeting' },
        { type: 'reference', value: 'thing' },
      ],
    },
    {
      name: 'style',
      operation: 'objectOf',
      arguments: [
        {
          type: 'reference',
          value: 'colorKey',
        },
        {
          type: 'reference',
          value: 'textColor',
        },
      ],
    },
  ],
  effects: [],
  setContexts: [],
  children: [
    {
      type: 'staticNode',
      element: 'div',
      props: [
        {
          name: 'style',
          value: {
            type: 'reference',
            value: 'style'
          }
        }
      ],
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
