import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Container, Button } from 'reactstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import query from '../queries/fetchBlog';
import fetchBlogs from '../queries/fetchBlogs';
import updateBlogMutation from '../queries/updateBlog';
import { History } from 'history';
import { Blog } from '../models/Blog';
import Loader from './Loader';
import { usePrevious } from '../hooks';

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
    const [blogData, setBlog] = useState<Blog>({ title: "", description: "", id: "" });
    const { loading, data } = useQuery<BlogData, {}>(
        query,
        { variables: { id: match.params.id } }
    );
    const [updateBlog] = useMutation<{ updateBlog: Blog }, { blog: Blog }>(updateBlogMutation, {
        variables: { blog: blogData },
        refetchQueries: [{ query: fetchBlogs }]
    });
    const prevLoading = usePrevious(loading);

    useEffect(() => {
        if (prevLoading !== loading && !loading) {
            const { id = '', title = '', description = '' } = (data && data.blog) || {};
            setBlog({ title, description, id });
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
                    <h4 className="text-center my-3">{blogData && blogData.title}</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="text-center">{blogData && blogData.description}</p>
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
        </Container>
    );
}