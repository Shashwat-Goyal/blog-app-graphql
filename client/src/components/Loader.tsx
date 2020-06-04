import React from 'react';
import { Spinner } from 'reactstrap';

interface Props {
    loading: Boolean
}

export default function BlogList(props: Props) {
    const { loading } = props;

    return (
        loading ? <div className="loader-spinner">
            <Spinner color="primary" />
        </div> : null
    );
}