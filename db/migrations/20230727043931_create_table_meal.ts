import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meal', (table) => {
    table.uuid('id').primary()
    table.text('name').notNullable()
    table.text('description').notNullable()
    table.datetime('createdAt').defaultTo(knex.fn.now()).notNullable()
    table.boolean('inDiet').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  console.log('Tabela meal deletada com sucesso')
  await knex.schema.dropTable('meal')
}
