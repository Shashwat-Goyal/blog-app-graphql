import { MockedProvider } from '@apollo/react-testing';
import React from 'react';
import { screen } from '@testing-library/react';
import { customRender } from '../../utils/test-utils';
const wait = require('waait');
// The component AND the query need to be exported
import BlogPage from './BlogPage';
import fetchBlog from '../../queries/fetchBlog';

const mocks = [
    {
        request: {
            query: fetchBlog,
            variables: { id: "1" }
        },
        result: {
            data: {
                blog: {
                    "id": "1",
                    "title": "Harry potter and the chamber of secret",
                    "description": "New desc"
                }
            },
        },
    },
];

it('check blog length', async () => {
    const { getByText } = customRender(<BlogPage match={{ params: { id: 1 }, isExact: true, path: "", url: "" }} />, "/blog/:id", mocks);

    await wait(100);

    const items = await screen.findAllByTestId('blog-form');
    expect(items).toHaveLength(1);
});