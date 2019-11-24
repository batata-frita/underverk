import { Project, Component } from '../../src/types'

export const Input: Component = {
  name: 'Input',
  props: [],
  states: [
    {
      name: 'value',
      updateFunction: 'setValue',
      defaultValue: { type: 'reference', value: 'defaultValue' },
    },
  ],
  effects: [
    {
      type: 'log',
      dependencies: ['value'],
      arguments: [
        {
          type: 'reference',
          value: 'value',
        },
      ],
    },
  ],
  literals: [
    { name: 'valueKey', value: 'value' },
    { name: 'targetKey', value: 'target' },
    { name: 'defaultValue', value: '' },
  ],
  declarations: [
    {
      name: 'handleChange',
      value: {
        type: 'function',
        arguments: [{ name: 'event' }],
        composition: [
          { name: 'setValue' },
          { name: 'get', arguments: [{ type: 'reference', value: 'valueKey' }] },
          { name: 'get', arguments: [{ type: 'reference', value: 'targetKey' }] },
        ],
      },
    },
  ],
  children: [
    {
      type: 'node',
      element: 'input',
      props: [
        { name: 'onChange', value: { type: 'reference', value: 'handleChange' } },
        { name: 'value', value: { type: 'reference', value: 'value' } },
      ],
      children: [],
    },
  ],
}

export const project: Project = {
  name: 'My components',
  components: [Input],
}
