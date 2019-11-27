import React, { PropsWithChildren } from 'react'
import * as R from 'ramda'

export const compose = R.compose

export const when = (condition: boolean, then: any, otherwise: any) => (condition ? then : otherwise)

export const get = R.curry((key, object) => object[key])

export const set = R.curry((key, value, object) => ({
  ...object,
  [key]: value,
}))

export const objectOf = R.curry((key, value) => ({
  [key]: value,
}))

export const append = R.curry((item, list) => [...list, item])

export const constant = (value: any) => () => value

export const dynamicNode = (
  Component: React.FunctionComponent,
  props: PropsWithChildren<{}> | PropsWithChildren<{}>[],
) => {
  if (Array.isArray(props)) {
    return props.map(props =>
      React.createElement(
        Component,
        R.omit(['children'], props),
        ...(Array.isArray(props.children) ? props.children : [props.children]),
      ),
    )
  }

  if (props !== undefined) {
    return React.createElement(
      Component,
      R.omit(['children'], props),
      ...(Array.isArray(props.children) ? props.children : [props.children]),
    )
  }

  return null
}

export const useEffect = React.useEffect

export const useState = React.useState

export const useCallback = React.useCallback

export const useContext = React.useContext

export const log = (item: any, callback: () => void) => {
  console.log(item)
  callback()
}

export const noop = () => {}
