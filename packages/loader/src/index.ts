import { generateProgram } from '@underverk/compiler'

export default function(jsonSource: string) {
  return generateProgram(JSON.parse(jsonSource))
}
