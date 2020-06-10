import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Container, Button, Input, Form, FormGroup, Label, Alert } from 'reactstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import query from '../../queries/fetchBlog';
import fetchBlogs from '../../queries/fetchBlogs';
import updateBlogMutation from '../../queries/updateBlog';
import { History } from 'history';
import { Blog } from '../../models/Blog';
import Loader from '../Loader';
import { usePrevious } from '../../hooks';

interface MatchParams {
    name: string;
    id: string;
}

export interface Match<P> {
    params: P;
    isExact: boolean;
    path: string;
    url: string;
}

interface Props<P> {
    history: History,
    match: Match<P>
}

interface BlogData {
    blog: Blog;
}

export default function BlogList(props: Props<MatchParams>) {
    const { match } = props;
    const [editMode, setEditMode] = useState(false);
    const [message, setMessage] = useState({ type: '', message: '' });
    const [blogData, setBlog] = useState<Blog>({ title: "", description: "", id: "" });
    const { loading, data } = useQuery<BlogData, {}>(
        query,
        { variables: { id: match.params.id } }
    );
    const [updateBlog, updateData] = useMutation<{ updateBlog: Blog }, { blog: Blog }>(updateBlogMutation, {
        variables: { blog: blogData },
        //refetchQueries: [{ query: fetchBlogs }]
    });

    const updateBlogLoading = updateData && updateData.loading || false;

    const prevLoading = usePrevious(loading) || false;
    const prevUpdateBlogLoading = usePrevious(updateBlogLoading) || false;

    useEffect(() => {
        if (prevLoading !== loading && !loading) {
            const { id = '', title = '', description = '' } = (data && data.blog) || {};
            setBlog({ title, description, id });
        }
        if (updateBlogLoading !== prevUpdateBlogLoading && !updateBlogLoading) {
            if (updateData && updateData.error) {
                setMessage({ type: 'danger', message: 'Server encountered an error' });
            }
            else {
                setMessage({ type: 'success', message: 'Blog Updated Successfully' });
            }
            setTimeout(() => setMessage({ type: '', message: '' }), 5000);
        }
    })

    if (loading) {
        return <Loader loading={loading} />
    }

    function onCancel() {
        setBlog((data && data.blog) || { title: "", description: "", id: "" })
        setEditMode(false);
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Form data-testid="blog-form">
                        <FormGroup>
                            <Label for="blog_title">Title</Label>
                            <Input disabled={!editMode} value={blogData.title} onChange={(e) => setBlog({ ...blogData, title: e.target.value })} type="text" name="email" id="blog_title" placeholder="Title" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="blog_description">Description</Label>
                            <Input disabled={!editMode} value={blogData.description} onChange={(e) => setBlog({ ...blogData, description: e.target.value })} type="text" name="password" id="blog_description" placeholder="Description" />
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    {!editMode ? <Button onClick={() => setEditMode(true)}>{editMode ? 'Save' : 'Edit'}</Button> : <Fragment>
                        <Button className="m-2" color="success" onClick={() => { updateBlog(); setEditMode(false) }}>Save</Button>
                        <Button className="m-2" color="danger" onClick={onCancel}>Cancel</Button>
                    </Fragment>}
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