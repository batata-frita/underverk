import compile from '../src'
import { Input } from './examples/statefulExample'
import statefulExampleJson from './snapshots/statefulExample'

describe('statefulExample', () => {
  it('compiles', () => {
    expect(
      compile(Input)
    ).toEqual(statefulExampleJson)
  })
})