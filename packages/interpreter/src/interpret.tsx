import React, { FC, ContextType } from 'react'
import { Component, Literal, Argument, ContextGetter } from './types'

let availableComponents: { [key: string]: FC } = {
  div: (props: {}) => <div {...props} />,
  svg: (props: {}) => <svg {...props} />,
}

export const interpretComponent = (componentAst: Component, contexts: { [key: string]: ContextType<any> }): FC => {
  const Result = (props: {}) => {
    const references: { [key: string]: any } = {
      ...interpretProps(componentAst.props, props),
      ...interpretLiterals(componentAst.literals),
      ...interpretContextGetters(componentAst.getContexts, contexts),
    }

    return (
      <>
        {componentAst.children.map((child, index) => {
          switch (child.type) {
            case 'staticNode': {
              const Target = availableComponents[child.element]
              return <Target key={index} />
            }

            case 'reference':
              return <span key={index}>{references[child.value]}</span>

            case 'dynamicNode':
              return <span key={index}>later</span>
          }
        })}
      </>
    )
  }

  Result.displayName = componentAst.name

  return Result
}

export const interpretProps = (propsAst: Argument[], props: { [key: string]: any }): {} =>
  propsAst.reduce((result, prop) => ({ ...result, [prop.name]: props[prop.name] }), {})

export const interpretLiterals = (literalsAst: Literal[]): {} =>
  literalsAst.reduce((result, literal) => ({ ...result, [literal.name]: literal.value }), {})

export const interpretContextGetters = (
  contextGettersAst: ContextGetter[],
  contexts: { [key: string]: ContextType<any> },
): {} =>
  contextGettersAst.reduce(
    (result, contextGetter) => ({
      ...result,
      [contextGetter.name]: contexts[contextGetter.context],
    }),
    {},
  )
