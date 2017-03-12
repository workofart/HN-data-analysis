import React, { Component } from 'react';
import {Grid, Row, Col, PageHeader} from 'react-bootstrap';
import BasicInfo from './BasicInfo';
import TableMain from '../Table/Table';
import SideInfo from './SideInfo';
import StoryVocabulary from './StoryVocabulary';

import CommentRow from '../TableRow/CommentRow';

var _ = require('underscore');
var $ = require('jquery');

function getStoryDetail(storyId) {
    console.log('storyId '  + storyId)
    var url = '/api/getStoryDetails/' + storyId;
    return JSON.parse($.ajax({url: url,
        type: 'get',
        async: false

    }).responseText);
}

function getTopComments(storyId) {
    console.log('storyId '  + storyId)
    var url = '/api/getTopComments/' + storyId;
    return JSON.parse($.ajax({url: url,
        type: 'get',
        async: false

    }).responseText);
}

function convertUnixDate(time) {
    var dateObj = new Date(time*1000);
    var date = dateObj.getDate();
    var month = dateObj.getMonth();
    var year = dateObj.getFullYear();
    return String(year) + ' ' + String(month) + ' ' + String(date);
}


const TopComments = () =>
    <Col md={6}>
        <PageHeader>
            Top Comments
        </PageHeader>
        <TableMain />
    </Col>


class StoryDetail extends Component {
    constructor() {
        super();
        this.state = {
            askDetail : null,
            topComments: null,
            storyVocabulary: null
        };
    }
    componentDidMount() {
        $.get('/api/getStoryDetails/' + this.props.params.storyId).done(function (data) {
            this.setState({askDetail : data});
        }.bind(this));

        $.get('/api/getTopComments/' + this.props.params.storyId).done(function (data) {
            this.setState({topComments: data});
        }.bind(this));

        $.get('/api/getStoryVocabulary/' + this.props.params.storyId).done(function (data) {
            if (data !== -1) {
                this.setState({storyVocabulary : data.vocabulary});
            }
            else {
                this.setState({storyVocabulary : data});
            }
        }.bind(this));
    }
    render() {

        if(this.state.askDetail && this.state.topComments) {
            var storyDetail = this.state.askDetail;
            var topCommentsRows = [];
            // this.state.topComments.forEach(function(comment, i) {
            //     topCommentsRows.push(<CommentRow key={comment.id} commentId={comment.id} id={i+1} Text={comment.text} Kids={comment.kids.length} />);
            // });
            return (
                <div className="App-body">
                    <Grid fluid={true}>
                        <Row>
                            <Col md={6}>
                                <BasicInfo id={storyDetail.id} title={storyDetail.title} date={convertUnixDate(storyDetail.time)} author={storyDetail.by} score={storyDetail.score} url={storyDetail.url} text={storyDetail.text}/>
                            </Col>
                            <Col md={6}>
                                <SideInfo rows={this.state.topComments}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <StoryVocabulary rows={this.state.storyVocabulary}/>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
        }
        return (
            <h3>Loading</h3>
        )

    }
}

export default StoryDetail;
