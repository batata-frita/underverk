import { compileComponent, generate, compileContext } from '../src'
import { App, TodoItem, Checkmark, Theme } from './examples/todoExample'
import { Button } from './examples/staticExample'

describe('statefulExample', () => {
  it('compiles', () => {
    expect(compileComponent(App)).toMatchSnapshot()
  })

  it('generates', () => {
    expect(generate(compileComponent(App))).toMatchSnapshot()
    expect(generate(compileComponent(TodoItem))).toMatchSnapshot()
    expect(generate(compileComponent(Checkmark))).toMatchSnapshot()
    expect(generate(compileContext(Theme))).toMatchSnapshot()
  })
})

describe('staticExample', () => {
  it('compiles', () => {
    expect(compileComponent(Button)).toMatchSnapshot()
  })

  it('generates', () => {
    expect(generate(compileComponent(Button))).toMatchSnapshot()
  })
})
