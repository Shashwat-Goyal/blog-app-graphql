import { MockedProvider } from '@apollo/react-testing';
import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { customRender } from '../../utils/test-utils';
const wait = require('waait');
// The component AND the query need to be exported
import CreateBlog from './CreateBlog';
import createBlog from '../../queries/createBlog';

const mocks = [
    {
        request: {
            query: createBlog,
            variables: {
                title: "Harry potter and the chamber of secret test",
                description: "New desc test"
            }
        },
        result: {
            data: {
                blog: {
                    "id": "1022",
                    "title": "Harry potter and the chamber of secret test",
                    "description": "New desc test"
                }
            },
        },
    },
];

it('renders without error', async () => {
    const { getByText } = customRender(<CreateBlog />, "/blog/create", mocks);
    const inputs = await screen.getAllByDisplayValue('');
    const titleLabel = await screen.findAllByLabelText('Title');
    //console.log(label, "label");
    expect(inputs).toHaveLength(2);
    expect(titleLabel).toHaveLength(1);

    fireEvent.change(inputs[0], { target: { value: 'a' } })
    const inputsAfterChange = await screen.getAllByDisplayValue('a');
    expect(inputsAfterChange).toHaveLength(1);
});

it('check if element changes state correctly', async () => {
    const { getByText } = customRender(<CreateBlog />, "/blog/create", mocks);
    const inputs = await screen.getAllByDisplayValue('');

    fireEvent.change(inputs[0], { target: { value: 'a' } })
    const inputsAfterChange = await screen.getAllByDisplayValue('a');
    expect(inputsAfterChange).toHaveLength(1);
})