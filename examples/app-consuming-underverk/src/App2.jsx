import React from 'react'
import {
  when,
  dynamicNode,
  useCallback,
  compose,
  set,
  objectOf,
  append,
  get,
  useEffect,
  log,
  noop,
  useState,
  constant,
} from '@underverk/prelude'

const Checkmark = ({}) => {
  const width = 20
  const height = 20
  const path = 'M0,5 L0,5 L5,10 L10,0 Z'
  const noneFill = 'none'
  const strokeWidth = '1px'
  const stroke = 'black'
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'svg',
      {
        width: width,
        height: height,
      },
      React.createElement('path', {
        fill: noneFill,
        strokeWidth: strokeWidth,
        stroke: stroke,
        d: path,
      }),
    ),
  )
}
const TodoItem = ({ done: done, text: text }) => {
  const emptyObject = {}
  let theUndefined
  const checkedProps = when(done, emptyObject, theUndefined)
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('li', null, text, dynamicNode(Checkmark, checkedProps)),
  )
}
const App = ({}) => {
  const valueKey = 'value'
  const targetKey = 'target'
  const listKey = 'list'
  const currentKey = 'current'
  const doneKey = 'done'
  const falseKey = 'false'
  const defaultCurrent = ''
  const textKey = 'text'
  const defaultState = {
    list: [],
    current: '',
  }
  const submitLabel = 'Submit'
  const getValueFromEvent = useCallback(
    (event, state) => compose(objectOf(currentKey), get(valueKey), get(targetKey))(event),
    [],
  )
  const addTodo = useCallback(
    (event, state) =>
      compose(
        set(listKey, append(set(doneKey, falseKey, objectOf(textKey, get(currentKey, state))), get(listKey, state))),
        set(currentKey, defaultCurrent),
        constant(state),
      )(event),
    [],
  )
  const [state, setState] = useState(defaultState)
  const handleCurrentChange = useCallback(
    event => {
      console.log('event', getValueFromEvent(event, state))
      setState({ ...state, ...getValueFromEvent(event, state) })
    },
    [state],
  )
  const updateClick = useCallback(event => setState({ ...state, ...addTodo(event, state) }), [state])
  const list = get(listKey, state)
  const value = get(valueKey, state)
  useEffect(() => {
    log(list, noop)
  }, [list])
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('input', {
      onChange: handleCurrentChange,
      value: value,
    }),
    React.createElement(
      'button',
      {
        onClick: updateClick,
      },
      submitLabel,
    ),
    React.createElement('ul', null, dynamicNode(TodoItem, list)),
  )
}

export default App
