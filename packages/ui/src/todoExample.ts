import { Component, Project } from '@underverk/compiler'

export const App: Component = {
  name: 'App',
  props: [],
  literals: [
    { name: 'valueKey', value: 'value' },
    { name: 'targetKey', value: 'target' },
    { name: 'listKey', value: 'list' },
    { name: 'currentKey', value: 'current' },
    { name: 'doneKey', value: 'done' },
    { name: 'falseKey', value: 'false' },
    { name: 'defaultCurrent', value: '' },
    { name: 'textKey', value: 'text' },
    { name: 'defaultState', value: { list: [], current: '' } },
    { name: 'submitLabel', value: 'Submit' },
  ],
  functions: [
    {
      name: 'getValueFromEvent',
      arguments: [{ name: 'event' }, { name: 'state' }],
      composition: [
        { type: 'operation', name: 'objectOf', arguments: [{ type: 'reference', value: 'currentKey' }] },
        { type: 'operation', name: 'get', arguments: [{ type: 'reference', value: 'valueKey' }] },
        { type: 'operation', name: 'get', arguments: [{ type: 'reference', value: 'targetKey' }] },
      ],
    },
    {
      name: 'addTodo',
      arguments: [{ name: 'event' }, { name: 'state' }],
      composition: [
        {
          type: 'operation',
          name: 'set',
          arguments: [
            { type: 'reference', value: 'listKey' },
            {
              type: 'operation',
              name: 'append',
              arguments: [
                {
                  type: 'operation',
                  name: 'set',
                  arguments: [
                    { type: 'reference', value: 'doneKey' },
                    { type: 'reference', value: 'falseKey' },
                    {
                      type: 'operation',
                      name: 'objectOf',
                      arguments: [
                        {
                          type: 'reference',
                          value: 'textKey',
                        },
                        {
                          type: 'operation',
                          name: 'get',
                          arguments: [
                            { type: 'reference', value: 'currentKey' },
                            { type: 'reference', value: 'state' },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'operation',
                  name: 'get',
                  arguments: [
                    { type: 'reference', value: 'listKey' },
                    { type: 'reference', value: 'state' },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'operation',
          name: 'set',
          arguments: [
            { type: 'reference', value: 'currentKey' },
            { type: 'reference', value: 'defaultCurrent' },
          ],
        },
        { type: 'operation', name: 'constant', arguments: [{ type: 'reference', value: 'state' }] },
      ],
    },
  ],

  state: {
    defaultValue: { type: 'reference', value: 'defaultState' },
    updateFunctions: [
      { name: 'handleCurrentChange', transformation: 'getValueFromEvent' },
      { name: 'updateClick', transformation: 'addTodo' },
    ],
  },

  computed: [
    {
      name: 'list',
      operation: 'get',
      arguments: [
        { type: 'reference', value: 'listKey' },
        { type: 'reference', value: 'state' },
      ],
    },
    {
      name: 'value',
      operation: 'get',
      arguments: [
        { type: 'reference', value: 'currentKey' },
        { type: 'reference', value: 'state' },
      ],
    },
  ],

  effects: [
    {
      type: 'log',
      dependency: 'list',
      handler: 'noop',
    },
  ],

  children: [
    {
      type: 'staticNode',
      element: 'input',
      props: [
        { name: 'onChange', value: { type: 'reference', value: 'handleCurrentChange' } },
        { name: 'value', value: { type: 'reference', value: 'value' } },
      ],
      children: [],
    },
    {
      type: 'staticNode',
      element: 'button',
      props: [{ name: 'onClick', value: { type: 'reference', value: 'updateClick' } }],
      children: [{ type: 'reference', value: 'submitLabel' }],
    },
    {
      type: 'staticNode',
      element: 'ul',
      props: [],
      children: [
        {
          type: 'dynamicNode',
          element: 'TodoItem',
          dependency: 'list',
        },
      ],
    },
  ],
}

export const TodoItem: Component = {
  name: 'TodoItem',
  props: [
    {
      name: 'done',
    },
    {
      name: 'text',
    },
  ],
  literals: [
    {
      name: 'emptyObject',
      value: {},
    },
    {
      name: 'theUndefined',
      value: undefined,
    },
  ],
  functions: [],
  computed: [
    {
      name: 'checkedProps',
      operation: 'when',
      arguments: [
        {
          type: 'reference',
          value: 'done',
        },
        {
          type: 'reference',
          value: 'emptyObject',
        },
        {
          type: 'reference',
          value: 'theUndefined',
        },
      ],
    },
  ],
  effects: [],
  children: [
    {
      type: 'staticNode',
      element: 'li',
      props: [],
      children: [
        {
          type: 'reference',
          value: 'text',
        },
        {
          type: 'dynamicNode',
          element: 'Checkmark',
          dependency: 'checkedProps',
        },
      ],
    },
  ],
}

export const Checkmark: Component = {
  name: 'Checkmark',
  props: [],
  literals: [
    { name: 'width', value: 20 },
    { name: 'height', value: 20 },
    { name: 'path', value: 'M0,5 L0,5 L5,10 L10,0 Z' },
    { name: 'noneFill', value: 'none' },
    { name: 'strokeWidth', value: '1px' },
    { name: 'stroke', value: 'black' },
  ],
  functions: [],
  computed: [],
  effects: [],
  children: [
    {
      type: 'staticNode',
      element: 'svg',
      props: [
        {
          name: 'width',
          value: { type: 'reference', value: 'width' },
        },
        {
          name: 'height',
          value: { type: 'reference', value: 'height' },
        },
      ],
      children: [
        {
          type: 'staticNode',
          element: 'path',
          props: [
            {
              name: 'fill',
              value: {
                type: 'reference',
                value: 'noneFill',
              },
            },
            {
              name: 'strokeWidth',
              value: {
                type: 'reference',
                value: 'strokeWidth',
              },
            },
            {
              name: 'stroke',
              value: {
                type: 'reference',
                value: 'stroke',
              },
            },
            {
              name: 'd',
              value: {
                type: 'reference',
                value: 'path',
              },
            },
          ],
          children: [],
        },
      ],
    },
  ],
}

export const project: Project = {
  name: 'Todo',
  components: [App, TodoItem, Checkmark],
}
