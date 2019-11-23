import { Project, Component } from '../../src/types'

export const Input: Component = {
  name: 'Input',
  props: [],
  states: [
    {
      name: 'value',
      updateFunction: 'setValue',
      defaultValue: { type: 'literal', value: '' },
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
  declarations: [
    {
      name: 'handleChange',
      value: {
        type: 'function',
        arguments: [{ name: 'event' }],
        body: {
          type: 'operation',
          name: 'setValue',
          arguments: [
            {
              type: 'operation',
              name: 'get',
              arguments: [
                { type: 'literal', value: 'value' },
                {
                  type: 'operation',
                  name: 'get',
                  arguments: [
                    { type: 'literal', value: 'target' },
                    { type: 'reference', value: 'event' },
                  ],
                },
              ],
            },
          ],
        },
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
