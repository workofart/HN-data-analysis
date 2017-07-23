import React, { Component } from 'react';
import {Table, Menu, Input, Label, Icon, Button, Message, Header, Segment, Dropdown} from 'semantic-ui-react';
import NotificationSystem from 'react-notification-system';
import TaggedStoryTable from './TaggedStoryTable';

import $ from 'jquery';

var arr = [];
var cachedStories = [];

class Story extends Component {
    _notificationSystem = null
    
    state = {
        randomStory: [],
        samples: 10,
        selectedTag: []
        
    }

    getRandomStory(samples, e) {
        // console.log(this.state.samples)
        $.get('/api/getRandomStories/' + samples).done(function(data) {
            data.forEach(function(item) {
                item.tag = item.tag.toString();
            })
            // console.log(data);
            this.setState({randomStory: data});
            cachedStories = data;
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

        $.get('/api/getRandomStories/' + this.state.samples).done(function(data) {
            data.forEach(function(item) {
                item.tag = item.tag.toString();
            })
            // console.log(data);
            this.setState({randomStory: data});
            cachedStories = data;
        }.bind(this))
    }

    _intersectArr(a, b) {
        var t;
        if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
        var result = a.filter(function (e) {
            return b.indexOf(e) > -1;
        });
        return result;
    }

    filterUnTaggedStories () {
        // console.log(this.state.selectedTag)
        // filter out the stories with the non-selected tags
        if (this.state.selectedTag.length > 0) {
            var filteredStory = this.state.randomStory.filter(function(story) {
                var tags = story.tag.split(',')
                return this._intersectArr(tags, this.state.selectedTag).length === this.state.selectedTag.length ? true : false
            }.bind(this))
            this.setState({randomStory : filteredStory});
        }
        else {
            this.setState({randomStory: cachedStories})
        }
    }

    render() {

        return (
            <Segment padded basic className='pageSegment'>
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
                            placeholder={this.state.samples + ' random stories'}
                        />
                        <Button color='orange' size='large' onClick={(e)=> {this.getRandomStory(this.state.samples, e)}}>Shuffle</Button>
                    </Menu.Item>
                </Menu>
                
                <TaggedStoryTable stories={this.state.randomStory}
                            setTag={(tag) =>{this.setState({selectedTag: tag}, () => { this.filterUnTaggedStories()})}}
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