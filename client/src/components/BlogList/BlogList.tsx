import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Container, CardBody } from 'reactstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import query from '../../queries/fetchBlogs';
import deleteMutation from '../../queries/deleteBlog';
import { History } from 'history';
import Loader from '../Loader';
import { Blog, BlogData } from '../../models/Blog';
import { client } from '../../App';

interface Props {
    history: History
}

export default function BlogList(props: Props) {
    const { history } = props;
    const { loading, data } = useQuery<BlogData, {}>(
        query
    );

    const [deleteBlog, deleteData] = useMutation<{}>(deleteMutation, {
        update(cache, deleteBlogData: any) {
            const deletedId = deleteBlogData && deleteBlogData.data && deleteBlogData.data.deleteBlog && deleteBlogData.data.deleteBlog.id;
            const index = data && data.blogs.findIndex(blog => blog.id === (deletedId)) || -1;
            if (index != -1) {
                let blogs = data && [...data.blogs] || [];
                blogs.splice(index, 1);
                cache.writeQuery({
                    query,
                    data: { blogs },
                });
            }
            /* cache.writeQuery({
                query,
                data: { blogs: data && data.blogs.concat([addTodo]) },
            }); */
        }
    });

    if (loading) {
        return <Loader loading={loading} />
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h4 className="text-center my-3">Blogs <Button className="pull-right" onClick={() => history.push('/blog/create')}>Create Blog</Button></h4>
                </Col>
            </Row>
            <Row>
                {
                    data && data.blogs.map(({ id, title, description }: Blog, index: number) => {
                        return (
                            <Col key={id} sm="6" className="my-2" data-testid="blog-item">
                                <Card>
                                    <CardBody>
                                        <CardTitle>{title}</CardTitle>
                                        <CardText>{description}</CardText>
                                        <Button onClick={() => history.push(`/blogs/${id}`)}>View Blog</Button>
                                        <Button className="mx-2" color="danger" onClick={() => deleteBlog({ variables: { id } })}>Delete Blog</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    );
}

/*import React from 'react';
import { ChildProps, graphql, withApollo } from "react-apollo";
import { compose } from 'recompose';
import query from '../../queries/fetchBlogs';
import deleteMutation from '../../queries/deleteBlog';
import { Card, Button, CardTitle, CardText, Row, Col, Container, CardBody } from 'reactstrap';
import { History } from 'history';

interface Props {
    history: History;
    data: {
        loading: boolean;
        error: object;
    }
}

interface Blog {
    id: string,
    title: string,
    description: string
}

type Response = {
    blogs: Blog[];
};

type QueryProps = {
    id: string
}

const withBlogs = graphql<QueryProps, Response>(query, {

});

const deleteBlogs = graphql<QueryProps, Response>(deleteMutation, {
    options: ({ id }) => ({
        variables: { id }
    })
});

class BlogList extends React.Component<ChildProps<Props, Response>, {}> {

    render() {
        const { loading, blogs = [], error } = this.props.data;
        console.log(this.props)
        if (loading) return <div>Loading</div>;
        if (error) return <h1>ERROR</h1>;
        return (<Container>
            <Row>
                <Col>
                    <h4 className="text-center my-3">Blogs</h4>
                    <Button className="pull-right" onClick={() => this.props.history.push('/blogs/create')}>Create Blog</Button>
                </Col>
            </Row>
            <Row>
                {
                    blogs.map(({ id, title, description }: Blog, index: number) => {
                        return (
                            <Col key={id} sm="6" className="my-2" data-testid="blog-item">
                                <Card>
                                    <CardBody>
                                        <CardTitle>{title}</CardTitle>
                                        <CardText>{description}</CardText>
                                        <Button onClick={() => console.log("test")}>View Blog</Button>
                                        <Button className="mx-2" color="danger" onClick={() => console.log("test")}>Delete Blog</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
        );
    }
}

export default compose(withApollo, deleteBlogs, withBlogs)(BlogList);*/