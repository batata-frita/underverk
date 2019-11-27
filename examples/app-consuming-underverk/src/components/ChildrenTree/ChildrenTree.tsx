import React from 'react'
import { Child, StaticNodeChild, Reference, DynamicNodeChild, Declaration } from '@underverk/compiler'

const ChildComponent = ({ data }: { data: Child[] }) => (
  <ol>
    {data.map(child => {
      switch (child.type) {
        case 'dynamicNode':
          return <DynamicNodeComponent {...child} />
        case 'staticNode':
          return <StaticNodeComponent {...child} />
        case 'reference':
          return <ReferenceComponent {...child} />
      }
    })}
  </ol>
)

const DynamicNodeComponent = (props: DynamicNodeChild) => {
  return (
    <li>
      <span role="img" aria-label="dynamic">
        🚀
      </span>
      {props.element}
      {' <- '}
      {props.dependency}
    </li>
  )
}

const ReferenceComponent = (props: Reference) => {
  return (
    <li>
      <span role="img" aria-label="reference">
        🔗
      </span>
      {props.value}
    </li>
  )
}

const StaticNodeComponent = (props: StaticNodeChild) => {
  return (
    <li>
      <span role="img" aria-label="static">
        🧱
      </span>
      {props.element}
      {props.props.length !== 0 && (
        <ul>
          {props.props.map(prop => (
            <PropComponent {...prop} />
          ))}
        </ul>
      )}
      {<ChildComponent data={props.children}></ChildComponent>}
    </li>
  )
}

const PropComponent = (props: Declaration) => {
  return (
    <li>
      <span role="img" aria-label="prop">
        🖌
      </span>
      {props.name}
      {' <- '}
      {props.value.value}
    </li>
  )
}

export default ChildComponent
