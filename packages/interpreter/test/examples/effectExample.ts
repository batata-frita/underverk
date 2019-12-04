import { Component } from '../../src/types'

export const EffectThing: Component = {
  name: 'EffectThing',
  props: [],
  literals: [{ name: 'planet', value: 'mars' }],
  getContexts: [],
  functions: [],
  computed: [],
  effects: [
    {
      type: 'log',
      dependency: 'planet',
      handler: 'noop',
    },
  ],
  setContexts: [],
  children: [],
}
