import React, { Component } from 'react';
import {Card, Segment, Header, Container, Icon} from 'semantic-ui-react';
import NotificationSystem from 'react-notification-system';
import './About.css';

class About extends Component {
    render() {
        return (
            <Segment compact padded className='aboutPageSegment'>
                <Segment color='brown' padded raised >
                    <Container text textAlign='left'>
                        <Header as='h2'>
                            <Icon name='idea' /> About this project...
                        </Header>
                    </Container>
                    <Container text>
                        This project stemmed from my personal habit of filtering news posts by their genre or category. Similarly, Reddit has subreddits that
                        organizes posts and discussions around a specific topic. This saves people, who's looking for a particular category, from digging through hundreds of posts to find one that
                        interests them. 
                    </Container>
                </Segment>
            </Segment>
        )
    }
}
export default About