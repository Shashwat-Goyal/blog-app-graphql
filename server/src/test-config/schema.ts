
const { gql } = require('apollo-server');
export const typeDefs = gql`
type Query {
    blog(id: ID!): Blog
    blogs: [Blog]
}
type Mutation {
    deleteBlog(id: ID!): DeleteResponse
    updateBlog(blog: BlogInput): Blog
    updateCompleteBlog(blog: BlogInput): Blog
    postBlog(blog: BlogInput!): Blog
}
type Blog {
    id:ID!
    title:String
    description:String
  }
  
  type DeleteResponse {
    id: ID
    message: String
  }
  
  input BlogInput {
    id: ID
    title: String
    description: String
  }
`