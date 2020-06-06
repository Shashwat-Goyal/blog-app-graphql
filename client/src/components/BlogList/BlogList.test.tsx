import { MockedProvider } from '@apollo/react-testing';
import React from 'react';
import { screen } from '@testing-library/react';
import { customRender } from '../../utils/test-utils';
const wait = require('waait');
// The component AND the query need to be exported
import BlogList from './BlogList';
import fetchBlogs from '../../queries/fetchBlogs';

const mocks = [
    {
        request: {
            query: fetchBlogs
        },
        result: {
            data: {
                blogs: [
                    {
                        "id": "1",
                        "title": "Harry potter and the chamber of secret",
                        "description": "New desc"
                    },
                    {
                        "id": "2",
                        "title": "Jurassic Park",
                        "description": "Story about dinosaur in the park"
                    }
                ]
            },
        },
    },
];

it('renders without error', async () => {
    const { getByText } = customRender(<BlogList />, "/", mocks);

    await wait(0);

    const element = getByText(/Harry potter/i)
    expect(element).toBeInTheDocument();
});

it('check blogs length', async () => {
    const { getByText } = customRender(<BlogList />, "/", mocks);

    await wait(0);

    const items = await screen.findAllByTestId('blog-item');
    expect(items).toHaveLength(2);
});