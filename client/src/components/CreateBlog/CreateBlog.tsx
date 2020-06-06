import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Container, Alert } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import query from '../../queries/createBlog';
import fetchBlogs from '../../queries/fetchBlogs';
import { Blog } from '../../models/Blog';

interface NewBlog {
    title: string;
    description: string;
}

export default function BlogList() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const [saveBlog, { loading, error, data }] = useMutation<
        { postBlog: Blog },
        { blog: NewBlog }
        >(query, {
            variables: { blog: { title, description } },
            refetchQueries: [{ query: fetchBlogs }]
        });

    return (
        <Container>
            <Row>
                <Col>
                    <h4 className="text-center my-3">Create Blog</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <FormGroup>
                            <Label for="blog_title">Title</Label>
                            <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="email" id="blog_title" placeholder="Title" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="blog_description">Description</Label>
                            <Input value={description} onChange={(e) => setDescription(e.target.value)} type="text" name="password" id="blog_description" placeholder="Description" />
                        </FormGroup>
                        <Button disabled={!title || !description} onClick={() => saveBlog()}>Create</Button>
                    </Form>
                </Col>
                {
                    message && <Alert color="success">
                        {message}
                    </Alert>
                }
            </Row>
        </Container>
    );
}