export default {
  type: 'VariableDeclaration',
  declarations: [
    {
      type: 'VariableDeclarator',
      id: {
        type: 'Identifier',
        name: 'Input',
      },
      init: {
        type: 'ArrowFunctionExpression',
        async: false,
        params: [],
        body: {
          type: 'BlockStatement',
          body: [
            {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'value',
                      },
                      {
                        type: 'Identifier',
                        name: 'setValue',
                      },
                    ],
                  },
                  init: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'state',
                    },
                    arguments: [
                      {
                        type: 'StringLiteral',
                        value: '',
                      },
                    ],
                  },
                },
              ],
              kind: 'const',
            },
            {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'handleChange',
                  },
                  init: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'callback',
                    },
                    arguments: [
                      {
                        type: 'ArrowFunctionExpression',
                        async: false,
                        params: [
                          {
                            type: 'Identifier',
                            name: 'event',
                          },
                        ],
                        body: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Identifier',
                            name: 'setValue',
                          },
                          arguments: [
                            {
                              type: 'CallExpression',
                              callee: {
                                type: 'Identifier',
                                name: 'get',
                              },
                              arguments: [
                                {
                                  type: 'StringLiteral',
                                  value: 'value',
                                },
                                {
                                  type: 'CallExpression',
                                  callee: {
                                    type: 'Identifier',
                                    name: 'get',
                                  },
                                  arguments: [
                                    {
                                      type: 'StringLiteral',
                                      value: 'target',
                                    },
                                    {
                                      type: 'Identifier',
                                      name: 'event',
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      },
                      {
                        elements: [],
                        type: 'ArrayExpression',
                      },
                    ],
                  },
                },
              ],
              kind: 'const',
            },
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'effect',
                },
                arguments: [
                  {
                    type: 'ArrowFunctionExpression',
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',
                            callee: {
                              type: 'Identifier',
                              name: 'log',
                            },
                            arguments: [
                              {
                                type: 'Identifier',
                                name: 'value',
                              },
                            ],
                          },
                        },
                      ],
                      directives: [],
                    },
                  },
                  {
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'value',
                      },
                    ],
                  },
                ],
              },
            },
            {
              type: 'ReturnStatement',
              argument: {
                type: 'JSXFragment',
                openingFragment: {
                  type: 'JSXOpeningFragment',
                },
                closingFragment: {
                  type: 'JSXClosingFragment',
                },
                children: [
                  {
                    selfClosing: true,
                    type: 'JSXElement',
                    openingElement: {
                      type: 'JSXOpeningElement',
                      name: {
                        type: 'JSXIdentifier',
                        name: 'input',
                      },
                      attributes: [
                        {
                          type: 'JSXAttribute',
                          name: {
                            type: 'JSXIdentifier',
                            name: 'onChange',
                          },
                          value: {
                            type: 'JSXExpressionContainer',
                            expression: {
                              type: 'Identifier',
                              name: 'handleChange',
                            },
                          },
                        },
                        {
                          type: 'JSXAttribute',
                          name: {
                            type: 'JSXIdentifier',
                            name: 'value',
                          },
                          value: {
                            type: 'JSXExpressionContainer',
                            expression: {
                              type: 'Identifier',
                              name: 'value',
                            },
                          },
                        },
                      ],
                      selfClosing: true,
                    },
                    closingElement: null,
                    children: [],
                  },
                ],
              },
            },
          ],
          directives: [],
        },
      },
    },
  ],
  kind: 'const',
}
