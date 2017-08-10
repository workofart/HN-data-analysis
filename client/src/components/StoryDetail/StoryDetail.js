import React, { Component } from 'react';
import BasicInfo from './BasicInfo';
import TableMain from '../Table/Table';
import SideInfo from './SideInfo';
import { Divider, Grid, Header } from 'semantic-ui-react';
import StoryVocabulary from './StoryVocabulary';
import CustomLoader from '../Misc/CustomLoader';
import './StoryDetail.css';

var _ = require('underscore');
var $ = require('jquery');

function convertUnixDate(time) {
    var dateObj = new Date(time * 1000);
    var date = dateObj.getDate();
    var month = dateObj.getMonth();
    var year = dateObj.getFullYear();
    return String(year) + '/' + String(month) + '/' + String(date);
}

class StoryDetail extends Component {

    state = {
        storyDetail: null,
        topComments: null,
        storyVocabulary: null,
        tags: {}, 
        isStick: false
    };

    handleScroll (event) {
        var top = event.target.scrollingElement.scrollTop
        // console.log(top);
        // if scrolling reached header, stick the title
        if (top > 30 && !this.state.isStick) {
            // console.log(this.props);
            this.props.stickTitle(this.state.storyDetail.title)
            this.setState({isStick : true})
        }
        else if (top <= 30 && this.state.isStick) {
            this.props.stickTitle('')
            this.setState({isStick : false})
        }
        
    }

    componentWillUnmount() {
        $(window).off('scroll')
        this.props.stickTitle('')
    }

    componentDidMount() {
        $(window).scroll(function(e) {
            this.handleScroll(e);
        }.bind(this))
        
        $.get('/api/getStoryDetails/' + this.props.match.params.storyId).done(function (data) {
            this.setState({ storyDetail: data });

            if (data.descendants > 0) {
                $.get('/api/getTopComments/' + this.props.match.params.storyId).done(function (data) {
                    data = data.filter(function (item) {
                        if (Object.keys(data).indexOf('deleted') !== -1) {
                            return false;
                        }
                        return true;
                    })
                    this.setState({ topComments: data });
                }.bind(this));
            }
            else {
                this.setState({ topComments: [] })
            }

        }.bind(this));

        $.get('/api/getStoryTagById/' + this.props.match.params.storyId).done(function (data) {
            this.setState({ tags: data });
        }.bind(this));
        // console.log(this.props);

        // $.get('/api/getStoryVocabulary/' + this.props.match.params.storyId).done(function (data) {
        //     if (data !== -1) {
        //         this.setState({storyVocabulary : data.vocabulary});
        //     }
        //     else {
        //         this.setState({storyVocabulary : data});
        //     }
        // }.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        var nextStoryId = nextProps.match.params.storyId;
        var oldStoryId = this.props.match.params.storyId;
        if (nextStoryId != oldStoryId) {
            console.log('Old: ' + oldStoryId)
            console.log('new: ' + nextStoryId)
            $.get('/api/getStoryDetails/' + nextStoryId).done(function (data) {
                this.setState({ storyDetail: data });

                if (data.descendants > 0) {
                    $.get('/api/getTopComments/' + nextStoryId).done(function (data) {
                        data = data.filter(function (item) {
                            if (Object.keys(data).indexOf('deleted') !== -1) {
                                return false;
                            }
                            return true;
                        })
                        this.setState({ topComments: data });
                    }.bind(this));
                }
                else {
                    this.setState({ topComments: [] })
                }

            }.bind(this));

            $.get('/api/getStoryTagById/' + nextStoryId).done(function (data) {
                this.setState({ tags: data });
            }.bind(this));
        }

    }

    render() {

        // const stickyStyle = this.state.isStick ?
        // {
        //     // transform: 'scale(0.8, 0.8)',
        //     // color: '#272623',
        //     // fontFamily: 'Martel',
        //     fontSize: '24px',
        //     // fontWeight: '300',
        //     // lineHeight: '52px',
        //     // marginBottom: '48px',
        //     textAlign: 'center',
        //     // paddingTop: '220px',
        //     // paddingBottom: '50px',
        //     transition: 'all ease 0.5s',
        //     background: '#e9ece5',
        //     top: '70px',
        //     position: 'fixed',
        //     width: '100%',
        //     zIndex: '120'
        // } :
        // {
        //     color: '#272623',
        //     fontFamily: 'Martel',
        //     fontSize: '32px',
        //     fontWeight: '300',
        //     lineHeight: '52px',
        //     marginBottom: '48px',
        //     textAlign: 'center',
        //     paddingTop: '80px',
        //     transition: 'all ease 0.5s'
        // }

        if (this.state.storyDetail && this.state.topComments != null) {
            var storyDetail = this.state.storyDetail;
            return (
                <div className='storyDetailBody'>
                    <h1 className='titleHeader'>
                        {'"' + storyDetail.title + '"'}
                    </h1>
                    <p className='authorSubheader'>{storyDetail.by + ' - ' + convertUnixDate(storyDetail.time)} </p>
                    <Grid padded relaxed verticalAlign='middle'>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <BasicInfo id={storyDetail.id} tags={this.state.tags} kids={storyDetail.descendants} title={storyDetail.title} date={convertUnixDate(storyDetail.time)} author={storyDetail.by} score={storyDetail.score} url={storyDetail.url} text={storyDetail.text} />
                            </Grid.Column>
                        </Grid.Row>
                        {/* { this.state.storyDetail.kids.length != 0 ? */}
                        {this.state.topComments.length > 0 ?
                            <Grid.Row>
                                <Grid.Column width={1} />
                                <Grid.Column width={14}>
                                    <SideInfo rows={this.state.topComments} />
                                </Grid.Column>
                            </Grid.Row>
                            :
                            <Grid.Row></Grid.Row>
                        }

                        {/* <Grid.Row>
                             <Grid.Column width={1} />
                             <Grid.Column width={12} textAlign='center'>
                                  <StoryVocabulary rows={this.state.storyVocabulary}/> 
                             </Grid.Column>
                         </Grid.Row> */}
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
