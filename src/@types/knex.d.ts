// eslint-disable-next-line
import { Knex } from "knex"

declare module 'knex/types/tables' {
  export interface Tables {
    user: {
      id: string
      name: string
      lastName: string
      createdAt: Date
      session_id: string
    }

    meal: {
      id: string
      name: string
      description: string
      inDiet: boolean
      createdAt: Date
    }
  }
}
