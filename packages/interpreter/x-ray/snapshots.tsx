import React from 'react'
import { mapPropsIterable, TComponentConfig } from 'autoprops'
import { TMeta } from '@x-ray/snapshots'
import * as underverk from '@underverk/prelude'
import { serializeElement } from '@x-ray/common-utils'
import { interpretComponent } from '../src'
import { Button } from '../test/examples/staticExample'

const ButtonComponent = interpretComponent(Button, { ...underverk })

export const config: TComponentConfig<any> = {
  props: {
    thing: ['Mars'],
    greeting: ['Hello', 'Hola'],
  },
  required: ['thing', 'greeting'],
}

export default mapPropsIterable(config, ({ id, props }): TMeta => ({
  id,
  serializedElement: serializeElement(ButtonComponent, props),
  element: <ButtonComponent {...props} />,
}))