/*
 * server.js
 * Copyright (C) 2018 yanpengqiang <yan2010@live.com>
 *
 * Distributed under terms of the MIT license.
 */

import express from 'express'
import expressGraphQL from 'express-graphql'

import schema from './schema'

const app = express()

app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true,
}))

app.listen(4000, () => {
  console.log('server is running on port 4000...')
})
