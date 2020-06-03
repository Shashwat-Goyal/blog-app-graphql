import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
import { BlogsAPI } from './datasources/blogs';

const app = express();
const server = new ApolloServer({
  schema,
  dataSources: () => ({
    blogsDataAPI: new BlogsAPI(),
  }),
  validationRules: [depthLimit(7)],
  playground: true
});
app.use('*', cors());
app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });
const httpServer = createServer(app);
httpServer.listen({ port: 3001 }, (): void =>
  console.log(`\n🚀      GraphQL is now running on http://localhost:3001/graphql`)
);
