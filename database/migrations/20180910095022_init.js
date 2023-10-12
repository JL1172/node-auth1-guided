

exports.up = async function (knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments()
      tbl.string("username", 128).notNullable().unique().index()
      tbl.string("password", 256).notNullable()
    })
    .createTable("sessions",table => {
      table.string("session_id").primary();
      table.json("session").notNullable();
      table.datetime("sessions_expired").notNullable();
    })
}


exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users"); 
  await knex.schema.dropTableIfExists("sessions");
}
