import * as t from '@babel/types'
import babelGenerate from '@babel/generator'
import { Component, State, Expression, Declaration, Effect, Child } from './types'
export * from './types'

export const generate = (ast: t.VariableDeclaration): string => babelGenerate(ast).code

export const compile = (componentAst: Component): t.VariableDeclaration =>
  t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(componentAst.name),
      t.arrowFunctionExpression(
        [],
        t.blockStatement([
          ...componentAst.states.map(compileState),
          ...componentAst.declarations.map(compileDeclaration),
          ...componentAst.effects.map(compileEffect),
          compileChildren(componentAst.children),
        ]),
      ),
    ),
  ])

const compileChildren = (childrenAst: Child[]): t.ReturnStatement =>
  t.returnStatement(t.jsxFragment(t.jsxOpeningFragment(), t.jsxClosingFragment(), childrenAst.map(compileChild)))

const compileChild = (childAst: Child): t.JSXElement | t.JSXText | t.JSXExpressionContainer => {
  switch (childAst.type) {
    case 'node':
      const selfClosingTag = childAst.children.length === 0

      return t.jsxElement(
        t.jsxOpeningElement(t.jsxIdentifier(childAst.element), childAst.props.map(compileProp), selfClosingTag),
        selfClosingTag ? undefined : t.jsxClosingElement(t.jsxIdentifier(childAst.element)),
        childAst.children.map(compileChild),
        selfClosingTag,
      )

    default:
      return t.jsxExpressionContainer(compileExpression(childAst))
  }
}

const compileProp = (propAst: Declaration): t.JSXAttribute =>
  t.jsxAttribute(t.jsxIdentifier(propAst.name), t.jsxExpressionContainer(compileExpression(propAst.value)))

const compileEffect = (effectAst: Effect): t.ExpressionStatement =>
  t.expressionStatement(
    t.callExpression(t.identifier('effect'), [
      t.arrowFunctionExpression(
        [],
        t.blockStatement([
          t.expressionStatement(
            t.callExpression(t.identifier(effectAst.type), effectAst.arguments.map(compileExpression)),
          ),
        ]),
      ),
      t.arrayExpression(effectAst.dependencies.map(dependency => t.identifier(dependency))),
    ]),
  )

const compileDeclaration = (declarationAst: Declaration): t.VariableDeclaration =>
  t.variableDeclaration('const', [
    t.variableDeclarator(t.identifier(declarationAst.name), compileExpression(declarationAst.value)),
  ])

const compileExpression = (expressionAst: Expression): t.Expression => {
  switch (expressionAst.type) {
    case 'literal':
      return t.stringLiteral(`${expressionAst.value}`)

    case 'function':
      return t.callExpression(t.identifier('callback'), [
        t.arrowFunctionExpression(
          expressionAst.arguments.map(argument => t.identifier(argument.name)),
          compileExpression(expressionAst.body),
        ),
        // TODO: resolve the dependencies here
        t.arrayExpression([]),
      ])

    case 'operation':
      return t.callExpression(t.identifier(expressionAst.name), expressionAst.arguments.map(compileExpression))

    case 'reference':
      return t.identifier(expressionAst.value)

    default:
      console.warn('🙈 expression captured by default case', expressionAst)
      return t.stringLiteral('')
  }
}

const compileState = (stateAst: State): t.VariableDeclaration =>
  t.variableDeclaration('const', [
    t.variableDeclarator(
      t.arrayPattern([t.identifier(stateAst.name), t.identifier(stateAst.updateFunction)]),
      t.callExpression(t.identifier('state'), [compileExpression(stateAst.defaultValue)]),
    ),
  ])
