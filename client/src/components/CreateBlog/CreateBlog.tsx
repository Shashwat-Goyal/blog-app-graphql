import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Container, Alert } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import query from '../../queries/createBlog';
import fetchBlogs from '../../queries/fetchBlogs';
import { Blog } from '../../models/Blog';
import { usePrevious } from '../../hooks';

interface NewBlog {
    title: string;
    description: string;
}

interface Message {
    type: string;
    message: string;
}

export default function BlogList() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState({ type: '', message: '' });

    const [saveBlog, { loading, error, data }] = useMutation<
        { postBlog: Blog },
        { blog: NewBlog }
        >(query, {
            variables: { blog: { title, description } },
            refetchQueries: [{ query: fetchBlogs }]
        });

    const prevLoading = usePrevious(loading) || false;

    useEffect(() => {
        if (prevLoading !== loading && !loading) {
            console.log(error && error.graphQLErrors, "error")
            if (error) {
                setMessage({ type: "danger", message: error && error.message || "Server encountered an error" });
            }
            else {
                setTitle('');
                setDescription('');
                setMessage({ type: "success", message: "Blog Created Successfully" });
            }
            setTimeout(() => setMessage({ type: '', message: '' }), 5000);
        }
    })

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
                        <Col className="text-center">
                            <Button disabled={!title || !description} onClick={() => saveBlog()}>Create Blog</Button>
                        </Col>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    {
                        message.message && <Alert className="mt-4" color={message.type}>
                            {message.message}
                        </Alert>
                    }
                </Col>
            </Row>
        </Container>
    );
}