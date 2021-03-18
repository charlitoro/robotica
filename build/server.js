"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./graphql/schema");
const resolvers_1 = require("./graphql/resolvers");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const path_1 = require("path");
const app = express_1.default()
    .set('port', process.env.PORT || 4000)
    .set('views', path_1.join(__dirname, 'app', 'views'))
    .set('view engine', 'pug')
    .use(express_1.default.static(path_1.join(__dirname, 'app', 'public')));
const port = app.get('port');
const graphqlServer = new apollo_server_express_1.ApolloServer({
    typeDefs: schema_1.schema,
    resolvers: resolvers_1.resolvers,
    introspection: true
});
graphqlServer.applyMiddleware({
    app, cors: {
        origin: '*',
        credentials: true
    }
});
app.use('/', (req, res) => {
    res.render('index');
});
app.listen(port, () => {
    console.log(`😄 Express server ready at http://localhost:${port}`);
    console.log(`🖥 Graphql server ready at http://localhost:${port}${graphqlServer.graphqlPath}`);
});
