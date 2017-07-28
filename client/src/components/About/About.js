import React, { Component } from 'react';
import { Card, Segment, Header, Container, Icon, Divider, List } from 'semantic-ui-react';
import NotificationSystem from 'react-notification-system';
import './About.css';
import _ from 'underscore';

const WebItemsArr = [
    'React',
    'Node.js',
    'Express.js',
    'Semantic UI',
    'JavaScript',
    'HTML5/CSS3'
]

const MLItemsArr = [
    'MongoDB',
    'Python',
    'Numpy',
    'LDA',
    'K-Means Clustering',
    'Scikit-Learn'
]
const CustomListItems = (arr) => {
    return _.map(arr,function(item) {
        return(
            <List.Item key={item}>
                <Icon name='right triangle' />{item}
            </List.Item>
        )  
    })
}

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
                    <Divider />
                    <Container text textAlign='left'>
                        <Header as='h2'>
                            <Icon name='cubes' /> Built using...
                        </Header>
                        <List>
                            <List.Item>
                                <List.Content>
                                    <List.Header as='h3'>
                                        Web
                                    </List.Header>
                                </List.Content>
                                <List.List>
                                        {CustomListItems(WebItemsArr)}
                                </List.List>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <List.Header as='h3'>Machine Learning (Natural Language Processing)</List.Header>
                                </List.Content>
                                <List.List>
                                    {CustomListItems(MLItemsArr)}
                                </List.List>
                            </List.Item>
                        </List>
                    </Container>
                    <Divider />
                    <Container text textAlign='right'>
                        Feel free to checkout my other projects {' '}
                        <a href='https://github.com/workofart'>
                            <Icon size='large' name='github' />
                        </a>
                    </Container>
                </Segment>
            </Segment >
        )
    }
}
export default About