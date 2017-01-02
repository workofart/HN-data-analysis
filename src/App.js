import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TableMain from './components/Table/Table';
import {Row, Col, PageHeader, Grid} from 'react-bootstrap';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>HackerNews Data Analysis</h2>          
        </div>
        <Grid fluid={true}>
            <Row>
              <Col md={6}>
                <PageHeader>
                    Top Comments
                </PageHeader>
                <TableMain />
              </Col>
                <Col md={6}>
                    <PageHeader>
                        Top Comments
                    </PageHeader>
                    <TableMain />
                </Col>
            </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
