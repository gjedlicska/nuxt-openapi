import { generateOpenApiJson } from './schema'

export default defineEventHandler(() => {
  return generateOpenApiJson()
})
