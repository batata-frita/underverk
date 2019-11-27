import * as t from '@babel/types'
import template from '@babel/template'
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
  Argument,
  Context,
  LiteralValue,
  ContextGetter,
  ContextSetter,
  Project,
} from './types'

export const compile = (projectAst: Project): t.VariableDeclaration[] => [
  ...projectAst.contexts.map(compileContext),
  ...projectAst.components.map(compileComponent),
]

export const compileContext = (contextAst: Context): t.VariableDeclaration =>
  t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(contextAst.name),
      t.callExpression(t.identifier('createContext'), [compileLiteralValue(contextAst.defaultValue)]),
    ),
  ])

export const compileComponent = (componentAst: Component): t.VariableDeclaration =>
  t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(componentAst.name),
      t.arrowFunctionExpression(
        [compileProps(componentAst.props)],
        t.blockStatement([
          ...componentAst.literals.map(compileLiteral),
          ...componentAst.getContexts.map(compileGetContext),
          ...componentAst.functions.map(compileFunction(componentAst.props)),
          ...(componentAst.state ? compileState(componentAst.state) : []),
          ...componentAst.computed.map(compileComputed),
          ...componentAst.effects.map(compileEffect),
          t.returnStatement(compileSetContexts(componentAst.setContexts, compileChildren(componentAst.children))),
        ]),
      ),
    ),
  ])

const compileGetContext = (getContextAst: ContextGetter): t.VariableDeclaration =>
  t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(getContextAst.name),
      t.callExpression(t.identifier('useContext'), [t.identifier(getContextAst.context)]),
    ),
  ])

const compileSetContexts = (
  setContextsAst: ContextSetter[],
  children: t.JSXElement | t.JSXFragment,
): t.JSXElement | t.JSXFragment => {
  if (setContextsAst.length === 0) {
    return children
  }

  const [head, ...tail] = setContextsAst
  return compileSetContexts(
    tail,
    t.jsxElement(
      t.jsxOpeningElement(t.jsxIdentifier(`${head.context}.Provider`), [
        t.jsxAttribute(t.jsxIdentifier('value'), t.jsxExpressionContainer(t.identifier(head.value))),
      ]),
      t.jsxClosingElement(t.jsxIdentifier(`${head.context}.Provider`)),
      [children],
      false,
    ),
  )
}

const compileProps = (propsAst: Argument[]): t.ObjectPattern =>
  t.objectPattern(propsAst.map(prop => t.objectProperty(t.identifier(prop.name), t.identifier(prop.name))))

const compileLiteral = (literalAst: Literal): t.VariableDeclaration =>
  t.variableDeclaration('const', [
    t.variableDeclarator(t.identifier(literalAst.name), compileLiteralValue(literalAst.value)),
  ])

const compileLiteralValue = (literalValue: LiteralValue): t.Expression => {
  switch (typeof literalValue) {
    case 'string':
      return t.stringLiteral(literalValue)

    case 'boolean':
      return t.booleanLiteral(literalValue)

    case 'number':
      return t.numericLiteral(literalValue)

    case 'object':
      return template.expression(JSON.stringify(literalValue))()

    case 'undefined':
      return t.identifier('undefined')

    default:
      console.warn('🙈 literal captured by default case', literalValue)
      return t.stringLiteral(`${literalValue}`)
  }
}

const compileFunction = (props: Argument[]) => (functionAst: Function): t.VariableDeclaration =>
  t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(functionAst.name),
      t.callExpression(t.identifier('useCallback'), [
        t.arrowFunctionExpression(
          functionAst.arguments.map(argument => t.identifier(argument.name)),
          compileComposition(functionAst.composition),
        ),
        t.arrayExpression(props.map(({ name }) => t.identifier(name))),
      ]),
    ),
  ])

const compileComposition = (expressionAst: Expression[]): t.CallExpression =>
  t.callExpression(t.callExpression(t.identifier('compose'), expressionAst.map(compileExpression)), [
    t.identifier('event'),
  ])

const compileChildren = (childrenAst: Child[]): t.JSXFragment =>
  t.jsxFragment(t.jsxOpeningFragment(), t.jsxClosingFragment(), childrenAst.map(compileChild))

const compileChild = (childAst: Child): t.JSXElement | t.JSXText | t.JSXExpressionContainer => {
  switch (childAst.type) {
    case 'staticNode':
      const selfClosingTag = childAst.children.length === 0

      return t.jsxElement(
        t.jsxOpeningElement(t.jsxIdentifier(childAst.element), childAst.props.map(compileJsxProp), selfClosingTag),
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

const compileJsxProp = (propAst: Declaration): t.JSXAttribute =>
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
      t.arrayPattern([t.identifier('state'), t.identifier('setState')]),
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
            t.objectExpression([
              t.spreadElement(t.identifier('state')),
              t.spreadElement(
                t.callExpression(t.identifier(updateFunctionAst.transformation), [
                  t.identifier('event'),
                  t.identifier('state'),
                ]),
              ),
            ]),
          ]),
        ),
        t.arrayExpression([t.identifier('state'), t.identifier(updateFunctionAst.transformation)]),
      ]),
    ),
  ])
