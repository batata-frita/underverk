/* eslint-disable */
import React from 'react'
import * as core from '@babel/core'
// @ts-ignore
import plugin from '@babel/plugin-transform-react-jsx'
import { App as AppSource, TodoItem as TodoItemSource, Checkmark as CheckmarkSource } from './todoExample'
import { compile, generate } from '@underverk/compiler'
import * as underverk from '@underverk/prelude'
import ChildrenTree from './components/ChildrenTree'

// import Overview from './components/Overview'

// @ts-ignore
const appCode = core.transform(generate(compile(AppSource)), { plugins: [plugin] }).code as string
// @ts-ignore
const todoItemCode = core.transform(generate(compile(TodoItemSource)), { plugins: [plugin] }).code as string
// @ts-ignore
const checkmarkCode = core.transform(generate(compile(CheckmarkSource)), { plugins: [plugin] }).code as string

window.React = React
// @ts-ignore
Object.keys(underverk).forEach(key => (window[key] = underverk[key]))

console.log('window.' + checkmarkCode.slice(6))
console.log('window.' + todoItemCode.slice(6))
console.log('window.' + appCode.slice(6))

declare const App: React.FunctionComponent
declare const TodoItem: React.FunctionComponent
declare const Checkmark: React.FunctionComponent
eval('window.' + checkmarkCode.slice(6))
eval('window.' + todoItemCode.slice(6))
eval('window.' + appCode.slice(6))

const NotApp: React.FC = () => (
  <pre>
    <App />
    <ChildrenTree data={AppSource.children} />
    <ChildrenTree data={TodoItemSource.children} />
    <ChildrenTree data={CheckmarkSource.children} />
  </pre>
)

export default NotApp
