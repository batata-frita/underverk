import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
/* eslint-disable import/no-webpack-loader-syntax */
import App from './testProgram.underverk.json'

// console.log('🧱', testProgram)

ReactDOM.render(<App />, document.getElementById('root'))

const yay = async () => {
  const read = await fetch('./example.json')
  const myJson = await read.json()

  await fetch('./example.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(myJson),
  })
}

yay()
