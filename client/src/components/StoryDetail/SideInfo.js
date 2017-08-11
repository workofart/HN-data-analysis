import React, { Component } from 'react';
import {Input, Segment, Icon, Header, Comment, Divider, Button, Container} from 'semantic-ui-react';
import NotificationSystem from 'react-notification-system';
import './SideInfo.css';
const _ = require('underscore');

function convertUnixDate(time) {
    var dateObj = new Date(time*1000);
    var date = dateObj.getDate();
    var month = dateObj.getMonth();
    var year = dateObj.getFullYear();
    return String(year) + '/' + String(month) + '/' + String(date);
}

const notificationStyle = {
    NotificationItem : {
        info: {
            marginTop: '60px'
        }
    }
}

class SideInfo extends Component{

    componentDidMount() {
        this._notificationSystem = this.refs.notificationSystem;
        this.debouncedSearch = _.debounce(this.handleSearch, 450).bind(this)
    }

    // check if the comments have changed, if so, set the state
    componentWillReceiveProps(nextProps) {  
        if (nextProps !== this.props) {
            this.setState({comments : nextProps.rows});
        }
    }

    handleSearch(e, data) {
        this.setState({searchParam : data.value});
    }

    sortComments(e) {
        var sorted_comments = _.sortBy(this.props.rows, 'numKids').reverse();
        this.setState({comments : sorted_comments});
        console.log(sorted_comments)
        this._addNotification(e, 'Comments sorted by popularity');
    }

    _addNotification (event, msg) {
        event.preventDefault();
        this._notificationSystem.addNotification({
        message: msg,
        level: 'info',
        position: 'tc',
        autoDismiss: 3
        });
    }

    CommentList (obj) {
        return (
            <Segment key={obj.id} vertical style={{ display : (String(obj.text)+ ' ' + String(obj.by)).toUpperCase().includes(this.state.searchParam.toUpperCase()) ? '' : 'none'}}>
            <Comment>
                <Comment.Content>
                    <Comment.Author>
                        <Icon name='user' />
                        {obj.by}
                    </Comment.Author>
                    <Comment.Metadata>
                        <div><Icon name='fire' />{obj.numKids}</div>
                        <div>
                            <Icon name='time' />
                            {convertUnixDate(obj.time)}
                        </div>
                    </Comment.Metadata>
                    <Comment.Text>
                        <div dangerouslySetInnerHTML={{__html: obj.text}} />
                    </Comment.Text>
                </Comment.Content>
            </Comment>
            </Segment>
        ); 
    }

    state = {
        searchParam : '',
        comments: this.props.rows
    }

    render () {
        var comments = this.state.comments;
        if(comments && comments.length != 0) {
            // Loop through dataset to generate comment replies
            
            for(var i = 0; i < comments.length; i++) {
                comments[i].numKids = comments[i].kids.length;
            }
            
            var commentsArr = [];
            comments.forEach(function(row) {
                commentsArr.push(this.CommentList(row));
            }.bind(this));

            return (
                <Segment piled raised color='orange'>
                    <NotificationSystem ref="notificationSystem" style={notificationStyle} />
                    <Header floated='left' as='h3'>
                        <Icon name='talk outline' />
                        User Comments
                    </Header>
                    <Input icon size='mini' icon='search' onChange={this.debouncedSearch} />
                    <Button floated='right' color='red' content='Trending' icon='line chart' onClick={this.sortComments.bind(this)} />
                    <Divider />
                    <Comment.Group>
                        {commentsArr}
                    </Comment.Group>
                </Segment>
            );
        }
        return (
            <div></div>
        )
    }
};


export default SideInfo;
