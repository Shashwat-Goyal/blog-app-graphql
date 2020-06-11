import { ApolloServer } from "apollo-server";
import ApolloServerBase, { createTestClient, ApolloServerTestClient } from 'apollo-server-testing';
//import schema from '../schema';
import { BlogsAPI } from '../datasources/blogs';
import { typeDefs } from './schema'
import resolvers from '../resolverMap';

export const constructTestServer = (dataSources: any): ApolloServerTestClient => {
    const blogsDataAPI = new BlogsAPI();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources,
    });

    return createTestClient(server);
};