import gql from 'graphql-tag';

const query = gql`
    {
        blogs {
            id
            title
            description
        }
    }
`

export default query;