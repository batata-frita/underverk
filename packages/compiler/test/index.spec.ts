import { compile, generate } from '../src'
import { App, TodoItem, Checkmark } from './examples/todoExample'
import { Button } from './examples/staticExample'

describe('statefulExample', () => {
  it('compiles', () => {
    expect(compile(App)).toMatchSnapshot()
  })

  it('generates', () => {
    expect(generate(compile(App))).toMatchSnapshot()
    expect(generate(compile(TodoItem))).toMatchSnapshot()
    expect(generate(compile(Checkmark))).toMatchSnapshot()
  })
})

describe('staticExample', () => {
  it('compiles', () => {
    expect(compile(Button)).toMatchSnapshot()
  })

  it('generates', () => {
    expect(generate(compile(Button))).toMatchSnapshot()
  })
})
