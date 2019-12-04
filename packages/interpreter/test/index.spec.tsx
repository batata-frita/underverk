import React from 'react'
// @ts-ignore
import renderer from 'react-test-renderer'
import * as underverk from '@underverk/prelude'
import { interpretComponent, interpretContext } from '../src'
import { Theme, TodoItem } from './examples/todoExample'
// import { Button } from './examples/staticExample'


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
    // const ButtonComponent = interpretComponent(Button, { ...underverk, theme: createContext({}) })
    const ThemeContext = interpretContext(Theme)
    // const CheckmarkComponent = interpretComponent(Checkmark, { ...underverk, theme: ThemeContext })
    const TodoItemComponent = interpretComponent(TodoItem, { ...underverk, theme: ThemeContext })

    // expect(renderer.create(<ButtonComponent />).toJSON()).toMatchSnapshot()
    // expect(renderer.create(<CheckmarkComponent />).toJSON()).toMatchSnapshot()
    expect(renderer.create(<ThemeContext.Provider value={{ textColor: 'rebeccapurple' }}><TodoItemComponent /></ThemeContext.Provider>).toJSON()).toMatchSnapshot()
  })
})
