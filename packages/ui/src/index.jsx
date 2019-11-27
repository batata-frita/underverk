import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
/* eslint-disable import/no-webpack-loader-syntax */
import testProgram from '-!@underverk/loader!./testProgram.underverk.js'

console.log('🧱', testProgram)

ReactDOM.render(<App />, document.getElementById('root'))
