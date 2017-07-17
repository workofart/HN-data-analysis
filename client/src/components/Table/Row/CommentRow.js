import React, { Component } from 'react';
import {Table} from 'semantic-ui-react';

class CommentRow extends Component{
    render () {
        return (
            <Table.Row>
                <Table.Cell>{this.props.id}</Table.Cell>
                <Table.Cell>{this.props.Text}</Table.Cell>
                <Table.Cell>{this.props.Kids}</Table.Cell>
            </Table.Row>
        )
    }
}

export default CommentRow;
