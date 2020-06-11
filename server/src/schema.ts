import 'graphql-import-node';
import * as typeDefs from './schema/schema.graphql';
import { Mutation } from './schema/MutationsSchema';
import { Query } from './schema/QueriesSchema';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolverMap';
import { GraphQLSchema } from 'graphql';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [Query, Mutation, typeDefs],
  resolvers,
});

export default schema;
