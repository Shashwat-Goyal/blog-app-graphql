import gql from 'graphql-tag';

const query = gql`
    mutation PostBlog($blog: BlogInput!) {
        postBlog(blog: $blog){
            id
            title
            description
        }
    }
`

export default query;