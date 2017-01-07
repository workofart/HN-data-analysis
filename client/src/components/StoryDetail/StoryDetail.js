import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import CommentRow from '../CommentRow/CommentRow';
var _ = require('underscore');
var $ = require('jquery');

function getStoryDetail() {
    var url = '/api/getStoryDetail';
    return JSON.parse($.ajax({url: url,
        type: 'get',
        async: false

    }).responseText);

}

class StoryDetail extends Component {
    render() {
        // var rows = [];
        // this.state.topStoriesJSON.forEach(function(story, i) {
        //     rows.push(<CommentRow key={story.id} id={i+1} Text={story.title} Score={story.score} Kids={story.descendants} />);
        // });
        return (
            <div className="App-body">
                <Grid fluid={true}>
                    <Row>
                        <Col md={12}>
                            <h4>Test page for {this.props.params.storyId}</h4>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default StoryDetail;
