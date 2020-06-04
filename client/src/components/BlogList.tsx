import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Container, CardBody } from 'reactstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import query from '../queries/fetchBlogs';
import deleteMutation from '../queries/deleteBlog';
import { History } from 'history';
import Loader from './Loader';

interface Props {
    history: History
}

interface Blog {
    id: string,
    title: string,
    description: string
}

interface BlogData {
    blogs: Blog[];
}

export default function BlogList(props: Props) {
    const { history } = props;
    const { loading, data } = useQuery<BlogData, {}>(
        query
    );

    const [deleteBlog, { error }] = useMutation<{}>(deleteMutation, {});

    if (loading) {
        return <Loader loading={loading} />
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h4 className="text-center my-3">Blogs</h4>
                    <Button className="pull-right" onClick={() => history.push('/blog/create')}>Create Blog</Button>
                </Col>
            </Row>
            <Row>
                {
                    data && data.blogs.map(({ id, title, description }: Blog, index: number) => {
                        return (
                            <Col key={id} sm="6" className="my-2">
                                <Card>
                                    <CardBody>
                                        <CardTitle>{title}</CardTitle>
                                        <CardText>{description}</CardText>
                                        <Button onClick={() => history.push(`/blogs/${id}`)}>View Blog</Button>
                                        <Button className="mx-2" color="danger" onClick={() => deleteBlog({ variables: { id }, refetchQueries: [{ query }] })}>Delete Blog</Button>
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