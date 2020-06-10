import gql from 'graphql-tag';

const query = gql`
    mutation DeleteBlog($id: ID!) {
        deleteBlog(id: $id) {
            id
            message
        }
    }
`

export default query;