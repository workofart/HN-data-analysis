import React, { Component } from 'react';
import {Grid, Row, Col, PageHeader} from 'react-bootstrap';
import BasicInfo from './BasicInfo';
import TableMain from '../Table/Table';
import SideInfo from './SideInfo';
import CommentRow from '../TableRow/CommentRow';

var _ = require('underscore');
var $ = require('jquery');

function getAskDetail(storyId) {
    console.log('storyId '  + storyId)
    var url = '/api/getAskDetails/' + storyId;
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
    render() {
        this.state = {
            askDetail: getAskDetail(this.props.params.storyId),
            topComments: getTopComments(this.props.params.storyId)
        };

        var askDetail = this.state.askDetail;
        var topComments = this.state.topComments;
        console.log(topComments);
        var topCommentsRows = [];
        this.state.topComments.forEach(function(comment, i) {
            topCommentsRows.push(<CommentRow key={comment.id} commentId={comment.id} id={i+1} Text={comment.text} Kids={comment.decendents} />);
        });
        return (
            <div className="App-body">
                <Grid fluid={true}>
                    <Row>
                        <Col md={6}>
                            <BasicInfo id={askDetail.id} title={askDetail.title} date={convertUnixDate(askDetail.time)} author={askDetail.by} score={askDetail.score} url={askDetail.url} text={askDetail.text}/>
                        </Col>
                        <Col md={6}>
                            <SideInfo rows={topCommentsRows}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default StoryDetail;
