import React from 'react'
import renderer from 'react-test-renderer'
import * as underverk from '@underverk/prelude'
import { interpretComponent, interpretContext } from '../src'
import { Theme, TodoItem, Checkmark } from './examples/todoExample'
import { Button } from './examples/staticExample'

type ButtonProps = {
  greeting: string
  thing: string
}

describe('staticExample', () => {
  it('interprets', () => {
    const ButtonComponent = interpretComponent<ButtonProps>(Button, { ...underverk })
    const ThemeContext = interpretContext(Theme)
    const CheckmarkComponent = interpretComponent(Checkmark, { ...underverk, theme: ThemeContext })
    const TodoItemComponent = interpretComponent(TodoItem, { ...underverk, theme: ThemeContext })

    expect(renderer.create(<ButtonComponent greeting="Hello" thing="Mars" />).toJSON()).toMatchSnapshot()
    expect(renderer.create(<CheckmarkComponent />).toJSON()).toMatchSnapshot()
    expect(
      renderer
        .create(
          <ThemeContext.Provider value={{ textColor: 'rebeccapurple' }}>
            <TodoItemComponent />
          </ThemeContext.Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot()
  })
})
