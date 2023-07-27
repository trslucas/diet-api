import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { checkSession } from '../middlewares/check-session'
import { knex } from '../database'
import { randomUUID } from 'crypto'

export async function mealsRoutes(app: FastifyInstance) {
  app.post('/', { preHandler: [checkSession] }, async (request, reply) => {
    const sessionId = request.cookies
    const user = await knex('user')
      .select('session_id')
      .where('session_id', sessionId)
    const createMealSchema = z.object({
      name: z.string(),
      description: z.string(),
      inDiet: z.boolean(),
    })

    const { name, description, inDiet } = createMealSchema.parse(request.body)

    if (!user) {
      throw new Error('Unauthorized')
    }
    await knex('meal').insert({
      id: randomUUID(),
      description,
      name,
      inDiet,
    })

    return reply.status(201).send()
  })

  app.get('/', { preHandler: [checkSession] }, async (request) => {
    const sessionId = request.cookies
    const user = await knex('user')
      .select('session_id')
      .where('session_id', sessionId)

    if (user) {
      const meal = await knex('meal').select('*')
      return {
        meal,
      }
    } else {
      throw new Error('Unauthorized')
    }
  })
}
