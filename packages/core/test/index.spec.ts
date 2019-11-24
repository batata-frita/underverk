import { compile, generate } from '../src'
import { Input } from './examples/statefulExample'
import { Button } from './examples/staticExample'

describe('statefulExample', () => {
  it('compiles', () => {
    expect(compile(Input)).toMatchSnapshot()
  })

  it('generates', () => {
    expect(generate(compile(Input))).toMatchSnapshot()
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
