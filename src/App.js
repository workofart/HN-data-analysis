import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TableMain from './components/Table/Table';
import {Row, Col} from 'react-bootstrap';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>HackerNews Data Analysis</h2>          
        </div>
        <Row>
          <Col md={6} mdOffset={3}>
            <TableMain />            
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
