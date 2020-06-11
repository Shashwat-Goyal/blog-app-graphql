import ApolloServerBase, { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';

import { constructTestServer } from '../test-config/test-server';

// the mocked REST API data
import { blogsMockResponse, blogMockResponse, blogCreateResponseMock } from '../test-config/mocks';
import { GET_BLOGS, GET_BLOG, UPDATE_BLOG, POST_BLOG } from '../queries';
import { Blog } from '../models/Blog';
import { BlogsAPI } from '../datasources/blogs';
// the mocked SQL DataSource store

const initMockServer = (mockresponse: any) => {
    const blogsDataAPI: any = new BlogsAPI();
    const getStub = () => Promise.resolve(mockresponse());
    blogsDataAPI.get = jest.fn(getStub)
    blogsDataAPI.patch = jest.fn(getStub)
    blogsDataAPI.post = jest.fn(getStub)


    // use our test server as input to the createTestClient fn
    // This will give us an interface, similar to apolloClient.query
    // to run queries against our instance of ApolloServer
    const { query, mutate } = constructTestServer(() => ({ blogsDataAPI }));
    return { query, blogsDataAPI, mutate }
}

describe('Queries', () => {
    beforeAll(() => {

    })
    it("check jest", () => {
        expect(2).toBe(2);
    })
    it('fetches list of blogs', async () => {
        const { query, blogsDataAPI } = initMockServer(blogsMockResponse);
        const res = await query({ query: GET_BLOGS });
        expect(res.data).toMatchSnapshot();
        expect(res.errors).toBe(undefined);
        expect(blogsDataAPI.get).toHaveBeenCalledWith('blogs');
        expect(res.data && res.data.blogs).toEqual(blogsMockResponse())
    });
    it('fetch blog', async () => {
        const { query, blogsDataAPI } = initMockServer(blogMockResponse);
        const res = await query({ query: GET_BLOG, variables: { id: '2' } });
        expect(res.data).toMatchSnapshot();
        expect(res.errors).toBe(undefined);
        expect(blogsDataAPI.get).toHaveBeenCalledWith('blogs/2');
        expect(res.data && res.data.blog).toEqual(blogMockResponse())
    });
    it('mutate blog:get Blog with ID', async () => {
        const { mutate, blogsDataAPI } = initMockServer(blogMockResponse);
        const variables = { "description": "ABC Test", "id": "s-on9Sj", "title": "Test ABC" };
        const res = await mutate({ mutation: UPDATE_BLOG, variables: { blog: variables } });
        console.log(res, "response update");
        //expect(res.data && res.data.updateBlog).toMatchSnapshot();
        expect(res.errors).toBe(undefined);
        expect(blogsDataAPI.patch).toHaveBeenCalledWith('blogs/s-on9Sj', variables);
        expect(res.data && res.data.updateBlog).toEqual(blogMockResponse())
    });
    it('mutate blog:add New Blog', async () => {
        const { mutate, blogsDataAPI } = initMockServer(blogCreateResponseMock);
        const input = { "description": "ABC Test", "title": "Test ABC" };
        const res = await mutate({ mutation: POST_BLOG, variables: { blog: input } });
        console.log(res, "response add");
        //expect(res.data && res.data.postBlog).toMatchSnapshot();
        expect(res.errors).toBe(undefined);
        expect(blogsDataAPI.post).toHaveBeenCalledWith('blogs', input);
        expect(res.data && res.data.postBlog).toEqual(blogCreateResponseMock())
    });
});