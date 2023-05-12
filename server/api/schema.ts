import {
  OpenAPIGenerator,
  OpenAPIRegistry,
  extendZodWithOpenApi,
} from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

export const registry = new OpenAPIRegistry()

export function generateOpenApiJson() {
  const generator = new OpenAPIGenerator(registry.definitions, '3.0.0')
  const document = generator.generateDocument({
    info: {
      version: '1.0.0',
      title: 'Nuxt OpenAPI example',
      description: 'This is the API schema',
    },
    servers: [{ url: '/' }],
  })
  return document
}
