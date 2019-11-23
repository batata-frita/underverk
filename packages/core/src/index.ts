import * as t from '@babel/types'
import { Component, State, Expression, Declaration } from './types'

export default (componentAst: Component): t.VariableDeclaration =>
  t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(componentAst.name),
      t.arrowFunctionExpression(
        [],
        t.blockStatement([
          ...componentAst.states.map(compileState),
          ...componentAst.declarations.map(compileDeclaration),
        ]),
      ),
    ),
  ])

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
