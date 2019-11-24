import { Project, Component } from '../../src/types'

export const Input: Component = {
  name: 'Input',
  props: [{ name: 'children' }],
  literals: [
    { name: 'valueKey', value: 'value' },
    { name: 'targetKey', value: 'target' },
    { name: 'defaultValue', value: '' },
    { name: 'urlKey', value: 'http://wikipedia.org' },
    { name: 'bodyKey', value: 'body' },
    { name: 'emailKey', value: 'email' },
  ],

  functions: [
    {
      name: 'getValueFromEvent',
      arguments: [{ name: 'event' }],
      composition: [
        { type: 'operation', name: 'get', arguments: [{ type: 'reference', value: 'valueKey' }] },
        { type: 'operation', name: 'get', arguments: [{ type: 'reference', value: 'targetKey' }] },
      ],
    },

    {
      name: 'processResponse',
      arguments: [{ name: 'response' }],
      composition: [
        { type: 'operation', name: 'get', arguments: [{ type: 'reference', value: 'emailKey' }] },
        { type: 'operation', name: 'get', arguments: [{ type: 'reference', value: 'bodyKey' }] },
      ],
    },

    {
      name: 'createFetchCall',
      arguments: [{ name: 'value' }],
      composition: [
        {
          type: 'operation',
          name: 'concat',
          arguments: [
            { type: 'reference', value: 'urlKey' },
            { type: 'reference', value: 'value' },
          ],
        },
      ],
    },
  ],

  states: [
    {
      name: 'value',
      defaultValue: { type: 'reference', value: 'defaultValue' },
      updateFunctions: [
        {
          name: 'handleChange',
          transformation: 'getValueFromEvent',
        },
        {
          name: 'handleResponse',
          transformation: 'processResponse',
        },
      ],
    },
  ],

  computed: [
    {
      name: 'fetchCall',
      operation: 'createFetchCall',
      arguments: [{ type: 'reference', value: 'value' }],
    },

    {
      name: 'liProps',
      operation: 'lala',
      arguments: [{ type: 'reference', value: 'children' }],
    },
  ],

  effects: [
    {
      type: 'log',
      dependencies: ['value'],
    },
    {
      type: 'fetch',
      dependencies: ['fetchCall'],
      handler: 'handleResponse',
    },
  ],

  children: [
    {
      type: 'staticNode',
      element: 'input',
      props: [
        { name: 'onChange', value: { type: 'reference', value: 'handleChange' } },
        { name: 'value', value: { type: 'reference', value: 'value' } },
      ],
      children: [],
    },
    {
      type: 'staticNode',
      element: 'ul',
      children: [
        {
          type: 'dynamicNode',
          element: 'Todo',
          dependency: 'liProps',
        },
      ],
    },
  ],
}

export const project: Project = {
  name: 'My components',
  components: [Input],
}
