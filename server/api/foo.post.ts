import { parseBodyAs, z } from '@sidebase/nuxt-parse'
import { defineEventHandler, setResponseStatus } from 'h3'
import { registry } from '~/server/api/schema'

const requestSchema = z.object({
  bar: z.string().length(10),
})

export const responseSchema = z.object({
  bar: z.string().length(10),
})

export type RequestBody = z.infer<typeof requestSchema>
export type ResponseBody = z.infer<typeof responseSchema>

const registerEndpoint = () =>
  registry.registerPath({
    tags: ['foo'],
    method: 'post',
    path: '/api/foo',
    summary: 'Create a new foo',
    request: {
      body: {
        content: {
          'application/json': {
            schema: registry.register('FooPostRequestSchema', requestSchema),
            example: {
              foo: '0123456789',
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Successfully created function result',
        content: {
          'application/json': {
            schema: registry.register('FooPostResponseSchema', responseSchema),
          },
        },
      },
    },
  })

registerEndpoint()

export default defineEventHandler(async (event): Promise<ResponseBody> => {
  const { bar } = await parseBodyAs(event, requestSchema)
  setResponseStatus(event, 201)
  return { bar }
})
