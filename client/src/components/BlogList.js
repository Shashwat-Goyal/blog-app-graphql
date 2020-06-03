import React, { PureComponent } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Container } from 'reactstrap';
import { graphql } from 'react-apollo';
import query from '../queries/fetchBlogs';

class BlogList extends PureComponent {
    render() {

        const { blogs=[] } = this.props.data;

        return (
            <Container>
                <Row>
                    <Col>
                        <h4 className="text-center my-3">Blogs</h4>
                    </Col>
                </Row>
                <Row>
                    {
                        blogs.map(({id, title, description}, index) => {
                            return (
                            <Col key={id} sm="6" className="my-2">
                                <Card body>
                                    <CardTitle>{title}</CardTitle>
                                    <CardText>{description}</CardText>
                                    <Button>View Blog</Button>
                                </Card>
                            </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        )
    }
}

export default (graphql(query)(BlogList));