import { FastifyInstance } from 'fastify'

import { z } from 'zod'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { checkSession } from '../middlewares/check-session'

export async function userRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createUserSchema = z.object({
      name: z.string(),
      lastName: z.string(),
    })

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()
      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    const { name, lastName } = createUserSchema.parse(request.body)

    await knex('user').insert({
      id: randomUUID(),
      name,
      lastName,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })

  app.get('/', { preHandler: [checkSession] }, async () => {
    const users = await knex.select('*').from('user')

    return {
      users,
    }
  })
}
