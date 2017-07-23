import React, { Component } from 'react';
import {Table, Label} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class StoryRow extends Component {

    state = {
        currentPage : 1
    }

    convertToTags(tags) {
        return String(tags).split(',').map(function(item) {
            return <Label color='teal' size='medium' key={item} as='button' onClick={(e) => {this.getTagsPage(item, e)}}>{item}</Label>
        }.bind(this))
    }

    getTagsPage(item, e) {
        var currentTags = this.props.selectedTag.slice();
        var newTags = currentTags.concat(item);
        // console.log(this.state.selectedTag);
        // console.log('Total items: ' + newTags);
        console.log(newTags);
        this.setState({selectedTag: newTags}, (newTags) =>{this.props.setTag(this.props.selectedTag.concat(item)); this.setState({currentPage: 1})})
    }

    render () {
        return (
            <Table.Row>
                <Table.Cell>{this.props.id}</Table.Cell>
                <Table.Cell><Link to={'/story/' + this.props.storyId}>{this.props.text}</Link></Table.Cell>
                <Table.Cell>{this.props.score}</Table.Cell>
                <Table.Cell>{this.props.kids}</Table.Cell>
                <Table.Cell collapsing>{this.convertToTags(this.props.tags)}</Table.Cell>
            </Table.Row>
        )
    }
};

export default StoryRow;