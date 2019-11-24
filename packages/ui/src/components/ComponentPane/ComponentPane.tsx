import React, { ReactNode } from 'react'

const ComponentPane = ({ name, children }: { name: string; children: ReactNode }) => (
  <div
    style={{
      backgroundColor: '#f0f0f0',
    }}
  >
    <h2>{name}</h2>
    {children}
  </div>
)

export default ComponentPane
