import React, { Component } from 'react';
import {Table} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class StoryRow extends Component {
    render () {
        return (
            <Table.Row>
                <Table.Cell>{this.props.id}</Table.Cell>
                {/* <Link to={'/topStories/' + this.props.storyId}><Table.Cell>{this.props.text}</Table.Cell></Link> */}
                <Table.Cell>{this.props.text}</Table.Cell>
                <Table.Cell>{this.props.score}</Table.Cell>
                <Table.Cell>{this.props.kids}</Table.Cell>
            </Table.Row>
        )
    }
};

export default StoryRow;