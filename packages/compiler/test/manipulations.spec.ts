import {
  createLiteral,
  createReference,
  createFunction,
  getReferenceType,
  getReferenceTypeWithinFunction,
  createComponent,
  createArgument,
  createContextGetter,
  createContextSetter,
  createOperation,
  createComputed,
  createUpdateFunction,
  createState,
} from '../src'
import { App, TodoItem } from './examples/todoExample'

describe('argument', () => {
  describe('createArgument', () => {
    expect(createArgument('onChange')).toEqual({
      name: 'onChange',
    })
  })
})

describe('component', () => {
  describe('createComponent', () => {
    it('gives back an object', () => {
      expect(createComponent('App')).toEqual({
        name: 'App',
        props: [],
        literals: [],
        getContexts: [],
        functions: [],
        computed: [],
        effects: [],
        setContexts: [],
        children: [],
      })
    })
  })
})

describe('contextGetter', () => {
  describe('createContextGetter', () => {
    it('gives back an object', () => {
      expect(createContextGetter('theme', 'Theme')).toEqual({
        name: 'theme',
        context: 'Theme',
      })
    })
  })
})

describe('contextSetter', () => {
  describe('createContextSetter', () => {
    it('gives back an object', () => {
      expect(createContextSetter('red', 'Theme')).toEqual({
        value: 'red',
        context: 'Theme',
      })
    })
  })
})

describe('reference', () => {
  describe('createReference', () => {
    it('gives back an object', () => {
      expect(createReference('textKey')).toEqual({
        type: 'reference',
        value: 'textKey',
      })
    })
  })

  describe('getReferenceType', () => {
    it('lists the right types', () => {
      expect(getReferenceType('done', TodoItem)).toEqual('prop')
      expect(getReferenceType('valueKey', App)).toEqual('literal')
      expect(getReferenceType('list', App)).toEqual('computed')
      expect(getReferenceType('addTodo', App)).toEqual('function')
      expect(getReferenceType('handleCurrentChange', App)).toEqual('updateFunction')
    })
  })

  describe('getReferenceTypeWithinFunction', () => {
    it('lists the right types', () => {
      expect(getReferenceTypeWithinFunction('valueKey', 'getValueFromEvent', App)).toEqual('literal')
      expect(getReferenceTypeWithinFunction('list', 'getValueFromEvent', App)).toEqual('computed')
      expect(getReferenceTypeWithinFunction('addTodo', 'getValueFromEvent', App)).toEqual('function')
      expect(getReferenceTypeWithinFunction('handleCurrentChange', 'getValueFromEvent', App)).toEqual('updateFunction')
      expect(getReferenceTypeWithinFunction('event', 'getValueFromEvent', App)).toEqual('argument')
    })
  })
})

describe('literal', () => {
  describe('createLiteral', () => {
    it('gives back a literal', () => {
      expect(createLiteral('name', 12)).toEqual({
        name: 'name',
        value: 12,
      })
    })
  })
})

describe('function', () => {
  describe('createFunction', () => {
    it('gives back an object', () => {
      expect(createFunction('getTheme')).toEqual({
        name: 'getTheme',
        arguments: [],
        composition: [],
      })
    })
  })
})

describe('operation', () => {
  describe('createOperation', () => {
    it('gives back an object', () => {
      expect(createOperation('getTheme')).toEqual({
        type: 'operation',
        name: 'getTheme',
        arguments: [],
      })
    })
  })
})

describe('computed', () => {
  describe('createComputed', () => {
    it('gives back an object', () => {
      expect(createComputed('theme', 'getTheme')).toEqual({
        operation: 'getTheme',
        name: 'theme',
        arguments: [],
      })
    })
  })
})

describe('updateFunction', () => {
  describe('createUpdateFunction', () => {
    it('gives back an object', () => {
      expect(createUpdateFunction('handleChange', 'getValue')).toEqual({
        name: 'handleChange',
        transformation: 'getValue',
      })
    })
  })
})

describe('state', () => {
  describe('createState', () => {
    it('gives back an object', () => {
      expect(createState(createReference('label'))).toEqual({
        defaultValue: { type: 'reference', value: 'label' },
        updateFunctions: [],
      })
    })
  })
})

// it('lists all the sources', () => {
//   expect(getComponentSources(App)).toEqual([
//     { type: 'literal', name: 'valueKey', value: 'value' },
//     { type: 'state', name: 'value' },
//     { type: 'handler', name: 'handleChange' },
//   ])
// })

// it.todo('lists all the sinks')

// describe('allows adding a source', () => {
//   it('literal')
//   it('state')
//   it('effect')
//   it('dom handler')
// })
