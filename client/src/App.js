import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, Switch, Link } from 'react-router-dom';
// import {Row, Col, PageHeader, Jumbotron, Alert} from 'react-bootstrap';
import { Header, Grid, Card, Image, Message, Sidebar, Menu, Icon, Segment, Button, Container } from 'semantic-ui-react';
import Nav from './components/Nav/Nav'
// import TopStoriesTable from './components/Table/TopStories';
import TopAsks from './components/Ask/TopAsks';
import StoryDetail from './components/StoryDetail/StoryDetail';
import AskDetail from './components/StoryDetail/AskDetail';
import TaggedStory from './components/Story/TaggedStory';
import TopStories from './components/TopStories/TopStories';
import CustomSidebar from './components/Sidebar/Sidebar';
import Users from './components/Users/Users';
import About from './components/About/About';
import './App.css';

const CardStack = () =>
    <Card.Group itemsPerRow={3}>
        {CardTemplate('Top Stories/Comments', 'Statistics', 'Based on calculated scores of posts and comments, filtered junk comment', 'trending', '/topStories')}
        {CardTemplate('Tagged/Classified Posts', 'Natural Language Processing', 'Find the genre of posts that interests you the most and forget crawling through tens and hundreds of posts to find one that you enjoy reading', 'tag', '/tags')}
        {CardTemplate('Most Influential Users', 'Statistics', 'Some users post rich content, and some users are experts in JavaScript, find who they are', 'topUser', '/topUsers')}
    </Card.Group>

const CardTemplate = (header, meta, desc, img, link, color = 'red') =>
    <Card as={Link} color={color} to={link} >
        <Image size='tiny' shape='circular' centered src={process.env.PUBLIC_URL + '/img/' + img + '.png'} />
        <Card.Content>
            <Card.Header>{header}</Card.Header>
            <Card.Meta>{meta}</Card.Meta>
            <Card.Description>{desc}</Card.Description>
        </Card.Content>
    </Card>

const Home = () =>
    <div className='coverPage'>
        <Grid centered relaxed>
            <Grid.Row className='topBorderRow' verticalAlign='top'>
                <Grid.Column width={3} />
                <Grid.Column width={10} textAlign='center'>
                    <Header as='h1'>
                        HackerNews Data Analysis
                    </Header>
                </Grid.Column>
                <Grid.Column width={3} />
            </Grid.Row>
            <Grid.Row columns='3' verticalAlign='middle'>
                <Grid.Column color='orange' />
                <Grid.Column color='yellow' />
                <Grid.Column color='orange' />
            </Grid.Row>
            <Grid.Row verticalAlign='middle'>
                {/*<Grid.Column width={3} />*/}
                <Grid.Column width={14} textAlign='center'>
                    {CardStack()}
                    {/*You can find interesting stuff based on the posts/comments people submit on
                    <Label as='a' href='https://news.ycombinator.com/'>HackerNews</Label>*/}
                </Grid.Column>
                {/*<Grid.Column width={3}/>*/}
            </Grid.Row>
            <Grid.Row columns='3' className='bottomBorderRow' verticalAlign='bottom'>
                <Grid.Column color='orange' />
                <Grid.Column color='yellow' textAlign='center' />
                <Grid.Column color='orange' />
            </Grid.Row>
        </Grid>
    </div>

const NotFound = () =>
    <Message error style={{ marginTop: '80px' }}>
        <strong>Holy shit!</strong> You're on the wrong page, please try again.
    </Message>


class App extends Component {
    state = {
        currentPage: 'home', 
        visible: false,
        searchQuery: '',
        searchResult: []
    }

    toggleVisibility = (status) => this.setState({ visible: status })

    setSearchQuery(text) {
        this.setState({searchQuery : text})
        console.log(text);
    }

    displaySearchResult(result) {
        this.setState({searchResult: result})
    }

    handleActivePage(currentPage) {
        this.setState({ currentPage: currentPage })
    }

    render() {
        const {visible} = this.state;
        return (
            <div className="App">
                <Nav currentPage={this.state.currentPage}
                    handleActivePage={this.handleActivePage}
                    toggleSidebar={this.toggleVisibility}
                    setSearchQuery={this.setSearchQuery.bind(this)}
                    fetchSearchResults={this.displaySearchResult.bind(this)}/>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Container}
                        animation='slide along'
                        width='wide'
                        direction='right'
                        visible={visible}
                        textAlign='center'>
                        <Icon className='sidebarCloseIcon' name='close' onClick={() => {this.toggleVisibility(false) }} />
                        <Header as='h3'>Search Results</Header>
                        <CustomSidebar searchResults={this.state.searchResult} toggleVisibility={this.toggleVisibility}/>
                    </Sidebar>
                    <Sidebar.Pusher>
                        {/* <Segment> */}
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route path='/topStories' component={TopStories} />
                                <Route path='/topAsks' component={TopAsks} />
                                <Route path='/tags' component={TaggedStory} />
                                <Route path='/story/:storyId' component={StoryDetail} />
                                <Route path='/users' component={Users} />
                                <Route path='/about' component={About} />
                                <Route component={NotFound} />
                            </Switch>
                        {/* </Segment> */}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}


export default App;
