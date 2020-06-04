import gql from 'graphql-tag';

const query = gql`
    mutation UpdateBlog($blog: BlogInput) {
        updateBlog(blog: $blog){
            id
            title
            description
        }
    }
`

export default query;