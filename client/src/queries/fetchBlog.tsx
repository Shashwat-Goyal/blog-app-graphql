import gql from 'graphql-tag';

const query = gql`
    query getBlog($id: ID!) {
        blog(id: $id) {
        id
        title
        description
        }
    }
`

export default query;