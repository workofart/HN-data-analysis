import React, { Component } from 'react';
import logo from './logo.svg';
import {Route, BrowserRouter, HashRouter, Switch, Link} from 'react-router-dom';
import {Row, Col, PageHeader, Jumbotron, Alert} from 'react-bootstrap';
import { Header, Segment, Label, Grid, Card, Image, Icon } from 'semantic-ui-react';
import Container from './Container';
import Nav from './components/Nav/Nav'
// import TopStoriesTable from './components/Table/TopStories';
import TopAsksTable from './components/Ask/TopAsks';
import StoryDetail from './components/StoryDetail/StoryDetail';
import AskDetail from './components/StoryDetail/AskDetail';
import Story from './components/Story/Story';
import TopStories from './components/Story/TopStories';
import './App.css';

const CardStack = () =>
    <Card.Group itemsPerRow={3}>
        {CardTemplate('Top Stories/Comments', 'Statistics', 'Based on calculated scores of posts and comments, filtered junk comment', 'trending', '/topStories')}
        {CardTemplate('Tagged/Classified Posts', 'Natural Language Processing', 'Find the genre of posts that interests you the most and forget crawling through tens and hundreds of posts to find one that you enjoy reading', 'tag', '/stories')}
        {CardTemplate('Most Influential Users', 'Statistics', 'Some users post rich content, and some users are experts in JavaScript, find who they are', 'topUser', '/topUsers')}
    </Card.Group>

const CardTemplate = (header, meta, desc, img, link, color='red') =>
    <Card as={Link} color={color} to={link} >
        <Image size='tiny' shape='circular' centered src={process.env.PUBLIC_URL + '/img/' +  img + '.png' } />
        <Card.Content>
        <Card.Header>{header}</Card.Header>
        <Card.Meta>{meta}</Card.Meta>
        <Card.Description>{desc}</Card.Description>
        </Card.Content>
    </Card>

const Home = () =>
    <div className='coverPage'>
        <Grid centered relaxed>
            <Grid.Row columns='3' className='topBorderRow' verticalAlign='top'>
                <Grid.Column color='orange'/>
                <Grid.Column color='yellow'/>
                <Grid.Column color='orange'/>
            </Grid.Row>
            <Grid.Row verticalAlign='middle'>
                <Grid.Column width={3} />
                <Grid.Column width={10} textAlign='center'>
                    <Header as='h2'>
                        HackerNews Data Analysis
                    </Header>
                </Grid.Column>
                <Grid.Column width={3}/>
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
                <Grid.Column color='orange'/>
                <Grid.Column color='yellow' textAlign='center' />
                <Grid.Column color='orange'/>
            </Grid.Row>
        </Grid>
    </div>




const TopAsks = () =>
        <div className='mainContent'>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <TopAsksTable />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>

const NotFound = () =>
    <div className="App-body">
        <Alert bsStyle="danger">
            <strong>Holy shit!</strong> You're on the wrong page, please try again.
        </Alert>
    </div>

// const Login = () =>
//     <div className="well">
//         <h1>Login Component</h1>
//         <h4><Link to='/'>Back to Home</Link></h4>
//     </div>

class App extends Component {
    state = {
        currentPage: 'home'
    }

    handleActivePage(currentPage) {
        this.setState({currentPage: currentPage})
    }

    render() {
        return (
            <div className="App">
                <Nav currentPage={this.state.currentPage} handleActivePage={this.handleActivePage}/>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/topStories' component={TopStories}/>
                    <Route path='/topAsks' component={TopAsks}/>
                    <Route path='/stories' component={Story} />
                    <Route path='/topStories/:storyId' components={StoryDetail} />
                    <Route path='/topAsks/:storyId' components={AskDetail} />
                    <Route component={NotFound}/>
                </Switch>
            </div>
        );
    }
}


export default App;
