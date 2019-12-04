import React from 'react'
import { mapPropsIterable, TComponentConfig } from 'autoprops'
import { TMeta } from '@x-ray/screenshot-utils'
import { serializeElement } from '@x-ray/common-utils'
import * as underverk from '@underverk/prelude'
import { interpretComponent } from '../src'
import { Button } from '../test/examples/staticExample'

export const config: TComponentConfig<any> = {
  props: {
    thing: ['Mars'],
    greeting: ['Hello', 'Hola'],
  },
  required: ['thing', 'greeting'],
}

const ButtonComponent = interpretComponent(Button, { ...underverk })

export default mapPropsIterable(config, ({ id, props }): TMeta => ({
  id,
  serializedElement: serializeElement(ButtonComponent, props),
  options: {
    hasOwnWidth: true,
    maxWidth: 600,
  },
  element: (
    <ButtonComponent {...props} />
  ),
}))
