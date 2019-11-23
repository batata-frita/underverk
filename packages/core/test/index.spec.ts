import { compile, generate } from '../src'
import { Input } from './examples/statefulExample'
import { Button } from './examples/staticExample'

import statefulExampleJson from './snapshots/statefulExample'
import staticExampleJson from './snapshots/staticExample'

describe('statefulExample', () => {
  it('compiles', () => {
    expect(compile(Input)).toEqual(statefulExampleJson)
  })

  it('generates', () => {
    expect(generate(compile(Input))).toMatchSnapshot()
  })
})

describe('staticExample', () => {
  it('compiles', () => {
    expect(compile(Button)).toEqual(staticExampleJson)
  })

  it('generates', () => {
    expect(generate(compile(Button))).toMatchSnapshot()
  })
})
