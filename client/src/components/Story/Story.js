import React, { Component } from 'react';
import {Table, Menu, Input, Label, Icon, Button, Message, Header, Segment} from 'semantic-ui-react';
import NotificationSystem from 'react-notification-system';
import StoryTable from './StoryTable';

import $ from 'jquery';

var arr = [];
class Story extends Component {
    _notificationSystem = null
    
    state = {
        randomStory: [],
        samples: 0,
        selectedTag: []
        
    }

    getRandomStory(samples, e) {
        // console.log(this.state.samples)
        $.get('/api/getRandomStories/' + samples).done(function(data) {
            data.forEach(function(item) {
                item.tag = item.tag.toString();
            })
            console.log(data);
            this.setState({randomStory: data});
        }.bind(this))

        console.log('Get Random Stopry called')
        // reset the selected tag
        this.setState({selectedTag: []});

        // notification of shuffled
        this._addNotification(e, 'Randomly found ' + samples + ' stories');

    }

    handleInputChange(data) {
        this.setState({samples: data.value})
    }
    

    _addNotification (event, msg) {
        event.preventDefault();
        this._notificationSystem.addNotification({
        message: msg,
        level: 'info',
        position: 'tc',
        autoDismiss: 1
        });
    }

    componentDidMount () {
        this._notificationSystem = this.refs.notificationSystem;
    }

    render() {

        return (
            <Segment padded basic>
                <NotificationSystem ref="notificationSystem" />
                <Header as='h2' icon textAlign='center'>
                    <Icon name='tags'/>
                    Tagged/Categorized Stories
                    <Header.Subheader>
                        Find the genre of posts that interests 
                        you the most and forget crawling through 
                        tens and hundreds of posts to find one that 
                        you enjoy reading
                    </Header.Subheader> 
                </Header>
                <Menu borderless color='yellow'>
                    <Menu.Item>
                        <Input
                            size='medium'
                            icon='random'
                            ref={(input) => {this.inputRef = input;}}
                            onChange={(e, data) =>{this.handleInputChange(data)}}
                            iconPosition='left'
                            placeholder='# of random stories'
                        />
                        <Button color='orange' size='large' onClick={(e)=> {this.getRandomStory(this.state.samples, e)}}>Shuffle</Button>
                    </Menu.Item>
                </Menu>
                
                <StoryTable stories={this.state.randomStory}
                            setTag={(tag) =>{this.setState({selectedTag: tag})}}
                            selectedTag={this.state.selectedTag} 
                            notificationSystem={this._notificationSystem}
                            recordPerPage={10}
                            colSpan={4}
                            />
            </Segment>
        )
    }
}

export default Story