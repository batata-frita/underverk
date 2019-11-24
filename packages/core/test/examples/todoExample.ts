import { Component, Project } from '../../src/types'

export const App: Component = {
  name: 'App',
  props: [],
  literals: [
    { name: 'valueKey', value: 'value' },
    { name: 'targetKey', value: 'target' },
    { name: 'defaultList', value: [] },
    { name: 'defaultCurrent', value: '' },
    { name: 'submitLabel', value: 'Submit' },
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
  ],
  states: [
    { name: 'list', defaultValue: { type: 'reference', value: 'defaultValue' } },
    {
      name: 'current',
      defaultValue: { type: 'reference', value: 'defaultCurrent' },
      updateFunctions: [
        { name: 'handleCurrentChange', transformation: 'getValueFromEvent' },
        { name: 'updateClick', transformation: 'addToDo' },
      ],
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
      props: [{ name: 'onClick', value: { type: 'reference', value: 'handleClick' } }],
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
  // props: []
}

export const project: Project = {
  name: 'Todo',
  components: [App, TodoList, TodoItem],
}
