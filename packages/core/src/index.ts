import * as t from '@babel/types'
import { Component, State, Expression } from './types'

const compileExpression = (expressionAst: Expression): t.StringLiteral =>
  t.stringLiteral(expressionAst.type === 'literal' ? `${expressionAst.value}` : '')

const compileState = (stateAst: State): t.VariableDeclaration =>
  t.variableDeclaration('const', [
    t.variableDeclarator(
      t.arrayPattern([t.identifier(stateAst.name), t.identifier(stateAst.updateFunction)]),
      t.callExpression(t.identifier('state'), [compileExpression(stateAst.defaultValue)]),
    ),
  ])

export default (componentAst: Component): t.VariableDeclaration =>
  t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(componentAst.name),
      t.arrowFunctionExpression([], t.blockStatement(componentAst.states.map(compileState))),
    ),
  ])
