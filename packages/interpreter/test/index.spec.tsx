import React, { createContext } from 'react'
// @ts-ignore
import renderer from 'react-test-renderer'
import { interpretComponent, interpretContext } from '../src'
import { Theme, Checkmark, TodoItem } from './examples/todoExample'
import { Button } from './examples/staticExample'

// describe('statefulExample', () => {
//   it('compiles', () => {
//     expect(compileComponent(App)).toMatchSnapshot()
//   })

//   it('generates', () => {
//     expect(generate(compileComponent(App))).toMatchSnapshot()
//     expect(generate(compileComponent(TodoItem))).toMatchSnapshot()
//     expect(generate(compileComponent(Checkmark))).toMatchSnapshot()
//     expect(generate(compileContext(Theme))).toMatchSnapshot()
//     expect(generateProgram(Project)).toMatchSnapshot()
//   })
// })

describe('staticExample', () => {
  it('interprets', () => {
    const ButtonComponent = interpretComponent(Button, { theme: createContext({}) })
    const CheckmarkComponent = interpretComponent(Checkmark, { theme: createContext({}) })
    const ThemeContext = interpretContext(Theme)
    const TodoItemComponent = interpretComponent(TodoItem, { theme: ThemeContext })

    expect(renderer.create(<ButtonComponent />).toJSON()).toMatchSnapshot()
    expect(renderer.create(<CheckmarkComponent />).toJSON()).toMatchSnapshot()
    expect(renderer.create(<TodoItemComponent />).toJSON()).toMatchSnapshot()
  })
})
