import gql from 'graphql-tag';

export const POST_BLOG = gql`
    mutation PostBlog($blog: BlogInput!) {
        postBlog(blog: $blog){
            id
            title
            description
        }
    }
`

export const DELETE_BLOG = gql`
    mutation DeleteBlog($id: ID!) {
        deleteBlog(id: $id) {
            id
            message
        }
    }
`

export const GET_BLOG = gql`
    query getBlog($id: ID!) {
        blog(id: $id) {
            id
            title
            description
        }
    }
`

export const GET_BLOGS = gql`
    query GetBlogs {
        blogs {
            id
            title
            description
        }
    }
`

export const UPDATE_BLOG = gql`
    mutation UpdateBlog($blog: BlogInput) {
        updateBlog(blog: $blog){
            id
            title
            description
        }
    }
`