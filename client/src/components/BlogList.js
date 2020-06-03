import React, { PureComponent } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class BlogList extends PureComponent {
    render() {
        return (
            <ListGroup>
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Morbi leo risus</ListGroupItem>
                <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
            </ListGroup>
        )
    }
}