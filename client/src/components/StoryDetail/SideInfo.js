import React, { Component } from 'react';
import {Input, Segment, Icon, Header, Comment, Divider, Button} from 'semantic-ui-react';
const _ = require('underscore');

function convertUnixDate(time) {
    var dateObj = new Date(time*1000);
    var date = dateObj.getDate();
    var month = dateObj.getMonth();
    var year = dateObj.getFullYear();
    return String(year) + '/' + String(month) + '/' + String(date);
}

class SideInfo extends Component{

    handleSearch(e, data) {
        this.setState({searchParam : data.value});
    }

    CommentList (obj) {
        return (
            <Comment key={obj.id} style={{ display : (String(obj.text)+ ' ' + String(obj.by)).toUpperCase().includes(this.state.searchParam.toUpperCase()) ? '' : 'none'}}>
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
                        {obj.text}
                    </Comment.Text>
                </Comment.Content>
            </Comment>
        ); 
    }

    state = {
        searchParam : ''
    }

    render () {
        if(this.props.rows) {
            // Loop through dataset to generate comment replies
            for(var i = 0; i < this.props.rows.length; i++) {
                this.props.rows[i].numKids = this.props.rows[i].kids.length;
            }

            var comments = [];
            this.props.rows.forEach(function(row) {
                comments.push(this.CommentList(row));
            }.bind(this));

            return (
                <Segment piled raised color='orange'>
                    <Header floated='left' as='h3'>
                        <Icon name='talk outline' />
                        User Comments
                    </Header>
                    <Input icon size='mini' icon='search' onChange={(e, data) => {this.handleSearch.bind(this)(e, data)}} />
                    <Button floated='right' color='red' content='Trending' icon='line chart' />
                    <Divider />
                    <Comment.Group>
                        {comments}
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
