import React, { Component } from 'react';
import BasicInfo from './BasicInfo';
import TableMain from '../Table/Table';
import SideInfo from './SideInfo';
import {Divider, Grid, Header} from 'semantic-ui-react'
import StoryVocabulary from './StoryVocabulary';
import CustomLoader from '../Misc/CustomLoader';

import './StoryDetail.css';

// import CommentRow from '../Table/Row/CommentRow';

var _ = require('underscore');
var $ = require('jquery');

function convertUnixDate(time) {
    var dateObj = new Date(time*1000);
    var date = dateObj.getDate();
    var month = dateObj.getMonth();
    var year = dateObj.getFullYear();
    return String(year) + '/' + String(month) + '/' + String(date);
}



class StoryDetail extends Component {

    state = {
            storyDetail : null,
            topComments: null,
            storyVocabulary: null
        };

    componentDidMount() {
        console.log(this.props);
        $.get('/api/getStoryDetails/' + this.props.match.params.storyId).done(function (data) {
            console.log(data);
            this.setState({storyDetail : data});
        }.bind(this));

        $.get('/api/getTopComments/' + this.props.match.params.storyId).done(function (data) {
            this.setState({topComments: data});
        }.bind(this));

        $.get('/api/getStoryVocabulary/' + this.props.match.params.storyId).done(function (data) {
            if (data !== -1) {
                this.setState({storyVocabulary : data.vocabulary});
            }
            else {
                this.setState({storyVocabulary : data});
            }
        }.bind(this));
    }
    render() {

        if(this.state.storyDetail && this.state.topComments) {
            var storyDetail = this.state.storyDetail;
            return (
                <div className='storyDetailBody'>
                    {/* <Header textAlign='center' style={{ marginTop : '50px'}} as='h1'>
                        {'----------------' + convertUnixDate(storyDetail.time) + '----------------'}
                    </Header>
                    <Header textAlign='center' style={{ marginTop : '50px'}} as='h1'>
                        {storyDetail.title.toUpperCase()}
                    </Header>
                    <Header textAlign='center' style={{ marginTop : '50px'}} as='h1'>
                        {'----------------' + storyDetail.by + '----------------'}
                    </Header> */}
                    <h1 className='titleHeader'>{'"' + storyDetail.title + '"'}</h1>
                    <p className='authorSubheader'>{storyDetail.by + ' - ' + convertUnixDate(storyDetail.time)} </p>
                    <Grid padded relaxed verticalAlign='middle'>
                        <Grid.Row>
                            {/* <Grid.Column width={1} /> */}
                            <Grid.Column width={16}>
                                  <BasicInfo id={storyDetail.id} kids={storyDetail.descendants} title={storyDetail.title} date={convertUnixDate(storyDetail.time)} author={storyDetail.by} score={storyDetail.score} url={storyDetail.url} text={storyDetail.text}/> 
                             </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={1} />
                             <Grid.Column width={14}>
                                  <SideInfo rows={this.state.topComments}/> 
                             </Grid.Column>
                         </Grid.Row>
                         <Grid.Row>
                             <Grid.Column width={1} />
                             <Grid.Column width={12} textAlign='center'>
                                  <StoryVocabulary rows={this.state.storyVocabulary}/> 
                             </Grid.Column>
                         </Grid.Row>
                     </Grid>
                </div>
            );
        }

        return (
            <CustomLoader />
        )

    }
}

export default StoryDetail;
