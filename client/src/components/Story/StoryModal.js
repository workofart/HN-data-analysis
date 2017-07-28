import React, { Component } from 'react';
import { Modal, Button, Header, Item, Label, Icon } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import CustomLoader from '../Misc/CustomLoader';
import './StoryModal.css';
import $ from 'jquery';
import _ from 'underscore';


function convertUnixDate(time) {
    var dateObj = new Date(time*1000);
    var date = dateObj.getDate();
    var month = dateObj.getMonth();
    var year = dateObj.getFullYear();
    return String(year) + '/' + String(month) + '/' + String(date);
}

const PostItem = (props) => {
    return (
        <Item>
            <Item.Content>
                <Item.Header>
                    <Link to={'/story/'+ props.id}>
                        <div dangerouslySetInnerHTML={{ __html: props.title }} />
                    </Link>
                </Item.Header>
                <Item.Meta>{props.author + ' - ' + convertUnixDate(props.date) + ' '}
                    <Label color='red'>
                        <Icon name='star' />
                        {' ' + props.score}
                    </Label>
                </Item.Meta>
            </Item.Content>
        </Item>
    )
}

class StoryModal extends Component {
    state = {
        posts: [],
        loading: false
    }

    getStoryByTags() {
        this.setState({loading: true})
        $.get('/api/getStoryByTags/' + this.props.selectedCategories.join(',').replace(' / ', '|')).done(function (data) {
            this.setState({ posts: data, loading: false });
        }.bind(this));
    }

    render() {
        var postsElements = [];
        if (this.state.posts.length > 0) {
            postsElements = this.state.posts.map(function (post) {
                return (
                    <PostItem key={post.id}
                        id={post.id}
                        title={post.title}
                        author={post.by}
                        score={post.score}
                        date={post.time} />
                )
            })
        }

        return (
            <Modal trigger={
                    <Button size='huge' color='red' onClick={this.getStoryByTags.bind(this)}>
                        Explore
                    </Button>
                    }
                    closeIcon='close'>
                <Modal.Header>Selected Posts{' '}
                    {_.map(this.props.selectedCategories, function(item) {
                        return <Label size='huge' key={item} color='orange'>{item}</Label>
                    })}
                </Modal.Header>
                {this.state.loading ? <CustomLoader /> : 
                    <Modal.Content image scrolling>
                        <Item.Group divided>
                            {postsElements}
                        </Item.Group>
                    </Modal.Content>
                }
                
                <Modal.Actions>
                    <Button primary>
                        Close <Icon name='close' />
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default StoryModal;