export default {
  type: 'VariableDeclaration',
  kind: 'const',
  declarations: [
    {
      type: 'VariableDeclarator',
      id: { type: 'Identifier', name: 'Button' },
      init: {
        type: 'ArrowFunctionExpression',
        params: [],
        body: {
          type: 'BlockStatement',
          body: [
            {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: { type: 'Identifier', name: 'label' },
                  init: {
                    type: 'CallExpression',
                    callee: { type: 'Identifier', name: 'concat' },
                    arguments: [
                      { type: 'StringLiteral', value: 'Hello' },
                      { type: 'StringLiteral', value: 'World' },
                    ],
                  },
                },
              ],
            },
            {
              type: 'ReturnStatement',
              argument: {
                type: 'JSXFragment',
                openingFragment: { type: 'JSXOpeningFragment' },
                closingFragment: { type: 'JSXClosingFragment' },
                children: [
                  {
                    type: 'JSXElement',
                    openingElement: {
                      type: 'JSXOpeningElement',
                      name: { type: 'JSXIdentifier', name: 'div' },
                      attributes: [],
                      selfClosing: false,
                    },
                    closingElement: { type: 'JSXClosingElement', name: { type: 'JSXIdentifier', name: 'div' } },
                    children: [{ type: 'JSXExpressionContainer', expression: { type: 'Identifier', name: 'label' } }],
                    selfClosing: false,
                  },
                ],
              },
            },
          ],
          directives: [],
        },
        async: false,
      },
    },
  ],
}
