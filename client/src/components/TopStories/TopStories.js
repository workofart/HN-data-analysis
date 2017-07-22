import React, { Component } from 'react';
import {Table, Menu, Input, Label, Icon, Segment, Header, Dropdown} from 'semantic-ui-react';
import NotificationSystem from 'react-notification-system';
import StoryTable from '../Table/Table';
import './TopStories.css';
import $ from 'jquery';

var arr = [];
const options = [
  {
    key: '10',
    text: '10',
    value: '10',
    content: '10',
  },
  {
    key: '30',
    text: '30',
    value: '30',
    content: '30',
  },
  {
    key: '50',
    text: '50',
    value: '50',
    content: '50',
  },
  {
    key: '100',
    text: '100',
    value: '100',
    content: '100',
  },
]

class TopStories extends Component {
    _notificationSystem = null
    
    componentDidMount() {
       $.get('/api/getTopStories/' + this.state.topN).done(function(data) {
            this.setState({topStories: data});
        }.bind(this));
    }

    componentDidUpdate() {
        // $.get('/api/getTopStories/' + this.state.topN).done(function(data) {
        //     this.setState({topStories: data});
        // }.bind(this));
        return true
    }

    handleNumberPost (e, data) {
        console.log(data.value);
        this.setState({topN : parseInt(data.value)}, function() {
             $.get('/api/getTopStories/' + this.state.topN).done(function(data) {
                this.setState({topStories: data});
            }.bind(this));
        })
        
    }

    state = {
        topStories: [],
        samples: 0,
        searchQuery: '',
        topN : 10
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
                        <Header floated='right' as='h4'>
                            <Icon name='options' />
                            <Header.Content>
                                Top
                                {' '}
                                <Dropdown inline
                                          header='# of posts'
                                          options={options}
                                          defaultValue={options[0].value}
                                          onChange={this.handleNumberPost.bind(this)} />
                            </Header.Content>
                        </Header>
                        
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