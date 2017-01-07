import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import CommentRow from '../CommentRow/CommentRow';
var _ = require('underscore');
var $ = require('jquery');

function getTopStories() {
    var url = '/api/getTopStories';
    return JSON.parse($.ajax({url: url,
        type: 'get',
        async: false

    }).responseText);

}

class TopStoriesTable extends Component {
    render() {

        this.state = {
            topStoriesJSON: getTopStories()
        };

        var rows = [];
        this.state.topStoriesJSON.forEach(function(story, i) {
            rows.push(<CommentRow key={story.id} storyId={story.id} id={i+1} Text={story.title} Score={story.score} Kids={story.descendants} />);
        });
        return (
            <Table responsive hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Score</th>
                    <th>Comments</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </Table>
        );
    }
}

export default TopStoriesTable;
