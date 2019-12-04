import React, { createContext, FC, Context as ReactContext } from 'react'
import {
  Component,
  Function,
  Literal,
  Argument,
  ContextGetter,
  Child,
  Declaration,
  Expression,
  Computed,
  Context,
  Effect,
} from './types'
import { API } from '@underverk/prelude'

let availableComponents: { [key: string]: FC } = {
  div: (props: {}) => <div {...props} />,
  path: (props: {}) => <path {...props} />,
  li: (props: {}) => <li {...props} />,
  svg: (props: {}) => <svg {...props} />,
}

export const interpretContext = (themeAst: Context): ReactContext<any> => createContext(themeAst.defaultValue)

interface References extends API {
  [key: string]: any
}

export const interpretComponent = <T extends unknown>(componentAst: Component, references: References): FC<T> => {
  const Result = (outerProps: {}) => {
    const props = interpretProps(componentAst.props, outerProps)
    const literals = interpretLiterals(componentAst.literals)
    const contextGetters = interpretContextGetters(componentAst.getContexts, references)
    const initialReferences: { [key: string]: any } = {
      ...references,
      ...props,
      ...literals,
      ...contextGetters,
    }

    const functions = interpretFunctions(componentAst.functions, initialReferences)

    const intermediateReferences: { [key: string]: any } = {
      ...initialReferences,
      ...functions,
    }

    const computeds = interpretComputeds(componentAst.computed, intermediateReferences)

    const finalReferences: { [key: string]: any } = {
      ...intermediateReferences,
      ...computeds,
    }

    componentAst.effects.forEach(interpretEffect(finalReferences))

    return interpretChildren(componentAst.children, finalReferences)
  }

  Result.displayName = componentAst.name

  return Result
}

const interpretEffect = (references: { [key: string]: any }) => (effectAst: Effect): void => {
  references.useEffect(() => {
    references[effectAst.type](references[effectAst.dependency], references[effectAst.handler])
  }, [references[effectAst.dependency]])
}

const interpretComputeds = (computedsAst: Computed[], references: { [key: string]: any }) =>
  computedsAst.reduce(
    (result, computed) => ({
      ...result,
      [computed.name]: interpretOperation(computed.operation, computed.arguments, { ...result, ...references }),
    }),
    {},
  )

export const interpretFunctions = (
  functionsAst: Function[],
  references: { [key: string]: any },
): { [key: string]: (a: any) => any } | {} =>
  functionsAst.reduce(
    (result, functionAst) => ({
      ...result,
      [functionAst.name]: (...args: []) => {
        const argReferences = {
          ...references,
          ...functionAst.arguments.reduce(
            (result, argument, index) => ({
              ...result,
              [argument.name]: args[index],
            }),
            {},
          ),
        }

        const arrayArgs = Array.of(args)

        return interpretComposition(functionAst.composition, { ...result, ...argReferences }, arrayArgs[0])
      },
    }),
    {},
  )

export const interpretComposition = (
  compositionAst: Expression[],
  references: { [key: string]: any },
  firstArg: any,
) => {
  const compositionFunctions = compositionAst.map(expression => interpretExpression(expression, references))
  return compositionFunctions.reduce(
    (resultFn, fn) => x => fn(resultFn(x)),
    x => x,
  )(firstArg)
}

export const interpretExpression = (expression: Expression, references: { [key: string]: any }): ((x: any) => any) => {
  switch (expression.type) {
    case 'reference':
      return references[expression.value]

    case 'operation':
      return interpretOperation(expression.name, expression.arguments, references)
  }
}

export const interpretOperation = (name: string, args: Expression[], references: { [key: string]: any }): any => {
  return references[name](...args.map(arg => interpretExpression(arg, references)))
}

export const interpretProps = (propsAst: Argument[], props: { [key: string]: any }): {} =>
  propsAst.reduce((result, prop) => ({ ...result, [prop.name]: props[prop.name] }), {})

export const interpretLiterals = (literalsAst: Literal[]): {} =>
  literalsAst.reduce((result, literal) => ({ ...result, [literal.name]: literal.value }), {})

export const interpretContextGetters = (contextGettersAst: ContextGetter[], references: References): {} =>
  contextGettersAst.reduce(
    (result, contextGetter) => ({
      ...result,
      [contextGetter.name]: references.useContext(references[contextGetter.name] as ReactContext<any>),
    }),
    {},
  )

export const interpretChildren = (childrenAst: Child[], references: { [key: string]: any }): React.ReactElement => (
  <>
    {childrenAst.map((child, index) => {
      switch (child.type) {
        case 'staticNode': {
          const Target = availableComponents[child.element]
          return (
            <Target key={index} {...interpretChildProps(child.props, references)}>
              {interpretChildren(child.children, references)}
            </Target>
          )
        }

        case 'reference':
          return references[child.value]

        case 'dynamicNode':
          return <span key={index}>later</span>
      }
    })}
  </>
)

export const interpretChildProps = (childPropsAst: Declaration[], references: { [key: string]: any }): {} =>
  childPropsAst.reduce((result, childProp) => ({ ...result, [childProp.name]: references[childProp.value.value] }), {})
