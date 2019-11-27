import * as t from '@babel/types'
import babelGenerate from '@babel/generator'
import { Project } from './types'
import { compile } from './compile'

const imports = [
  'compose',
  'when',
  'get',
  'set',
  'objectOf',
  'append',
  'constant',
  'dynamicNode',
  'useEffect',
  'useState',
  'useCallback',
  'useContext',
  'createContext',
  'log',
  'noop',
]

export const generateProgram = (projectAst: Project): string => {
  const babelAstForProject = compile(projectAst)
  const program = t.program([
    t.importDeclaration([t.importDefaultSpecifier(t.identifier('React'))], t.stringLiteral('react')),
    t.importDeclaration(
      imports.map(importName => t.importSpecifier(t.identifier(importName), t.identifier(importName))),
      t.stringLiteral('@underverk/prelude'),
    ),
    ...babelAstForProject,
    t.exportDefaultDeclaration(t.identifier(projectAst.root)),
  ])

  return babelGenerate(program).code
}

export const generate = (ast: t.VariableDeclaration): string => babelGenerate(ast).code
