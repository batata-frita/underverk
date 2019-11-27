import { getReferenceType } from '../src'
import { App, TodoItem } from './examples/todoExample'

describe('getReferenceType', () => {
  it('lists the right types', () => {
    expect(getReferenceType('textKey', TodoItem)).toEqual('prop')
    expect(getReferenceType('valueKey', App)).toEqual('literal')
    expect(getReferenceType('list', App)).toEqual('computed')
    expect(getReferenceType('addTodo', App)).toEqual('function')
    expect(getReferenceType('handleCurrentChange', App)).toEqual('updateFunction')
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
