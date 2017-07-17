import React, { Component } from 'react';
import {Table, Menu, Input, Label, Icon, Segment, Header} from 'semantic-ui-react';
import NotificationSystem from 'react-notification-system';
import StoryTable from '../Table/Table';
import $ from 'jquery';

var arr = [];
class TopStories extends Component {
    _notificationSystem = null
    
    componentDidMount() {
        $.get('/api/getTopStories').done(function(data) {
            this.setState({topStories: data});
        }.bind(this));
    }


    state = {
        topStories: [],
        samples: 0,
        searchQuery: ''
    }

    handleSearch(e, data) {
        this.setState({searchQuery : data.value});
    }

    render() {
             return (
                    <Segment basic padded>
                        <Header as='h2' icon textAlign='center'>
                            <Icon name='star' loading/>
                            Top Stories
                        <Header.Subheader>
                            Based on calculated scores of posts and comments, filtered junk comment
                        </Header.Subheader> 
                        </Header>
                        <Input onChange={(e, data) => {this.handleSearch.bind(this)(e, data)}} placeholder='Search...' />
                        <StoryTable tableType='story'
                                    rowData={this.state.topStories}
                                    colSpan={4}
                                    recordPerPage={10}
                                    searchQuery={this.state.searchQuery}
                                    /> 
                        
                    </Segment>
            )
    }
}

export default TopStories