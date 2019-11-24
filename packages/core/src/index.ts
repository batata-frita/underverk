import * as t from '@babel/types'
import babelGenerate from '@babel/generator'
import {
  Component,
  State,
  Expression,
  Declaration,
  Effect,
  Child,
  Literal,
  Computed,
  Reference,
  Function,
  UpdateFunction,
} from './types'
export * from './types'
export * from './manipulations'

export const generate = (ast: t.VariableDeclaration): string => babelGenerate(ast).code

export const compile = (componentAst: Component): t.VariableDeclaration =>
  t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(componentAst.name),
      t.arrowFunctionExpression(
        [],
        t.blockStatement([
          ...componentAst.literals.map(compileLiteral),
          ...componentAst.functions.map(compileFunction),
          ...(componentAst.state ? compileState(componentAst.state) : []),
          ...componentAst.computed.map(compileComputed),
          ...componentAst.effects.map(compileEffect),
          compileChildren(componentAst.children),
        ]),
      ),
    ),
  ])

const compileLiteral = (literalAst: Literal): t.VariableDeclaration => {
  switch (typeof literalAst.value) {
    case 'string':
      return t.variableDeclaration('const', [
        t.variableDeclarator(t.identifier(literalAst.name), t.stringLiteral(literalAst.value)),
      ])

    case 'boolean':
      return t.variableDeclaration('const', [
        t.variableDeclarator(t.identifier(literalAst.name), t.booleanLiteral(literalAst.value)),
      ])

    case 'number':
      return t.variableDeclaration('const', [
        t.variableDeclarator(t.identifier(literalAst.name), t.numericLiteral(literalAst.value)),
      ])

    default:
      console.warn('🙈 literal captured by default case', literalAst)
      return t.variableDeclaration('const', [
        t.variableDeclarator(t.identifier(literalAst.name), t.stringLiteral(`${literalAst.value}`)),
      ])
  }
}

const compileFunction = (functionAst: Function): t.VariableDeclaration =>
  t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(functionAst.name),
      t.arrowFunctionExpression(
        functionAst.arguments.map(argument => t.identifier(argument.name)),
        compileComposition(functionAst.composition),
      ),
    ),
  ])

const compileComposition = (expressionAst: Expression[]): t.CallExpression =>
  t.callExpression(t.identifier('compose'), expressionAst.map(compileExpression))

const compileChildren = (childrenAst: Child[]): t.ReturnStatement =>
  t.returnStatement(t.jsxFragment(t.jsxOpeningFragment(), t.jsxClosingFragment(), childrenAst.map(compileChild)))

const compileChild = (childAst: Child): t.JSXElement | t.JSXText | t.JSXExpressionContainer => {
  switch (childAst.type) {
    case 'staticNode':
      const selfClosingTag = childAst.children.length === 0

      return t.jsxElement(
        t.jsxOpeningElement(t.jsxIdentifier(childAst.element), childAst.props.map(compileProp), selfClosingTag),
        selfClosingTag ? undefined : t.jsxClosingElement(t.jsxIdentifier(childAst.element)),
        childAst.children.map(compileChild),
        selfClosingTag,
      )

    case 'dynamicNode':
      return t.jsxExpressionContainer(
        t.callExpression(t.identifier('dynamicNode'), [
          t.identifier(childAst.element),
          t.identifier(childAst.dependency),
        ]),
      )

    default:
      return t.jsxExpressionContainer(compileExpression(childAst))
  }
}

const compileProp = (propAst: Declaration): t.JSXAttribute =>
  t.jsxAttribute(t.jsxIdentifier(propAst.name), t.jsxExpressionContainer(compileExpression(propAst.value)))

const compileEffect = (effectAst: Effect): t.ExpressionStatement =>
  t.expressionStatement(
    t.callExpression(t.identifier('useEffect'), [
      t.arrowFunctionExpression(
        [],
        t.blockStatement([
          t.expressionStatement(
            t.callExpression(t.identifier(effectAst.type), [
              t.identifier(effectAst.dependency),
              t.identifier(effectAst.handler),
            ]),
          ),
        ]),
      ),
      t.arrayExpression([t.identifier(effectAst.dependency)]),
    ]),
  )

const compileComputed = (computedAst: Computed): t.VariableDeclaration =>
  t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(computedAst.name),
      t.callExpression(t.identifier(computedAst.operation), computedAst.arguments.map(compileReference)),
    ),
  ])

const compileExpression = (expressionAst: Expression): t.Expression => {
  switch (expressionAst.type) {
    case 'operation':
      return t.callExpression(t.identifier(expressionAst.name), expressionAst.arguments.map(compileExpression))

    case 'reference':
      return compileReference(expressionAst)

    default:
      console.warn('🙈 expression captured by default case', expressionAst)
      return t.stringLiteral('')
  }
}

const compileReference = (referenceAst: Reference): t.Identifier => t.identifier(referenceAst.value)

const compileState = (stateAst: State): t.VariableDeclaration[] => [
  t.variableDeclaration('const', [
    t.variableDeclarator(
      t.arrayPattern([t.identifier('state'), t.identifier('updateState')]),
      t.callExpression(t.identifier('useState'), [compileExpression(stateAst.defaultValue)]),
    ),
  ]),
  ...stateAst.updateFunctions.map(compileUpdateFunction),
]

const compileUpdateFunction = (updateFunctionAst: UpdateFunction): t.VariableDeclaration =>
  t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(updateFunctionAst.name),
      t.callExpression(t.identifier('useCallback'), [
        t.arrowFunctionExpression(
          [t.identifier('event')],
          t.callExpression(t.identifier('setState'), [
            t.callExpression(t.identifier(updateFunctionAst.transformation), [
              t.identifier('event'),
              t.identifier('state'),
            ]),
          ]),
        ),
        t.arrayExpression([t.identifier('state')]),
      ]),
    ),
  ])
