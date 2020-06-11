export const Mutation = `type Mutation {
    deleteBlog(id: ID!): DeleteResponse
    updateBlog(blog: BlogInput): Blog
    updateCompleteBlog(blog: BlogInput): Blog
    postBlog(blog: BlogInput!): Blog
}`;