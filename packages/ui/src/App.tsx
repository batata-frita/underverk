// /* eslint-disable */
// import React from 'react'
// import * as core from '@babel/core'
// // @ts-ignore
// import plugin from '@babel/plugin-transform-react-jsx'
// import { App as AppSource, TodoItem as TodoItemSource, Checkmark as CheckmarkSource } from './todoExample'
// import { compile, generate } from '@underverk/compiler'
// import * as underverk from '@underverk/prelude'
// import ComponentPane from './components/ComponentPane'
// import ChildrenTree from './components/ChildrenTree'
// import FunctionView from './components/FuncionView'

// // import Overview from './components/Overview'

// // @ts-ignore
// const appCode = core.transform(generate(compile(AppSource)), { plugins: [plugin] }).code as string
// // @ts-ignore
// const todoItemCode = core.transform(generate(compile(TodoItemSource)), { plugins: [plugin] }).code as string
// // @ts-ignore
// const checkmarkCode = core.transform(generate(compile(CheckmarkSource)), { plugins: [plugin] }).code as string

// window.React = React
// // @ts-ignore
// Object.keys(underverk).forEach(key => (window[key] = underverk[key]))

// console.log('window.' + checkmarkCode.slice(6))
// console.log('window.' + todoItemCode.slice(6))
// console.log('window.' + appCode.slice(6))

// declare const App: React.FunctionComponent
// declare const TodoItem: React.FunctionComponent
// declare const Checkmark: React.FunctionComponent
// eval('window.' + checkmarkCode.slice(6))
// eval('window.' + todoItemCode.slice(6))
// eval('window.' + appCode.slice(6))

// const NotApp: React.FC = () => (
//   <pre>
//     <App />

//     {AppSource.functions.map(f => (
//       <div style={{ width: 1024, height: 600, backgroundColor: '#FFFFF0' }}>
//         <FunctionView data={f} />
//       </div>
//     ))}
//     <ComponentPane name={AppSource.name}>
//       <ChildrenTree data={AppSource.children} />
//     </ComponentPane>

//     <ComponentPane name={TodoItemSource.name}>
//       <ChildrenTree data={TodoItemSource.children} />
//     </ComponentPane>

//     <ComponentPane name={CheckmarkSource.name}>
//       <ChildrenTree data={CheckmarkSource.children} />
//     </ComponentPane>
//   </pre>
// )

// export default NotApp

export default () => {}
