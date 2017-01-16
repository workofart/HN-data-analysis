import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Router, Route, IndexRoute, hashHistory, Link, browserHistory} from 'react-router';
import {Row, Col, PageHeader, Grid, Jumbotron, Alert} from 'react-bootstrap';
import Container from './Container';
import TopStoriesTable from './components/Table/TopStories';
import TopAsksTable from './components/Ask/TopAsks';
import StoryDetail from './components/StoryDetail/StoryDetail';
import AskDetail from './components/StoryDetail/AskDetail';


const Home = () =>
    <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>HackerNews Data Analysis</h2>
        <Jumbotron>
            <PageHeader>
                Welcome to HackerNews Data Analysis
                <small>By Henry</small>
            </PageHeader>
        </Jumbotron>
    </div>


const TopStories = () =>
    <div className="App-body">
        <Grid fluid={true}>
            <Row>
                <Col md={12}>
                    <PageHeader>
                        Top Stories
                        <span className="glyphicon glyphicon-book" />
                    </PageHeader>
                    <TopStoriesTable />
                </Col>
            </Row>
        </Grid>
    </div>

const TopAsks = () =>
    <div className="App-body">
        <Grid fluid={true}>
            <Row>
                <Col md={12}>
                    <PageHeader>
                        Top Asks
                        <span className="glyphicon glyphicon-question-sign" />
                    </PageHeader>
                    <TopAsksTable />
                </Col>
            </Row>
        </Grid>
    </div>

const NotFound = () =>
    <div className="App-body">
        <Alert bsStyle="danger">
            <strong>Holy shit!</strong> You're on the wrong page, please try again.
        </Alert>
    </div>

const Login = () =>
    <div className="well">
        <h1>Login Component</h1>
        <h4><Link to='/'>Back to Home</Link></h4>
    </div>

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router history={hashHistory}>
                    <Route path='/' component={Container}>
                        <IndexRoute component={Home}/>
                        <Route path='topStories' component={TopStories}/>
                        <Route path='topAsks' component={TopAsks}/>
                        <Route path='topStories/:storyId' components={StoryDetail} />
                        <Route path='topAsks/:storyId' components={AskDetail} />
                    </Route>
                    <Route path="/login" component={Login} />
                    <Route path='*' component={NotFound}/>
                </Router>
            </div>
        );
    }
}


export default App;
