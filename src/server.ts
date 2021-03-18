import { schema } from './graphql/schema'
import { resolvers } from './graphql/resolvers'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { join } from 'path'

const app = express()
    .set('port', process.env.PORT || 4000)
    .set('views', join(__dirname, 'app', 'views'))
    .set('view engine', 'pug')
    .use(express.static(join(__dirname, 'app', 'public')))

const port = app.get('port')

const graphqlServer = new ApolloServer({
    typeDefs: schema,
    resolvers,
    introspection: true
})

graphqlServer.applyMiddleware({
    app, cors: {
        origin: '*',
        credentials: true
    }
})

app.use('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`😄 Express server ready at http://localhost:${port}`)
    console.log(`🖥 Graphql server ready at http://localhost:${port}${graphqlServer.graphqlPath}`)
})