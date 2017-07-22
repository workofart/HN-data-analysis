import React, {Component} from 'react';
import {Segment, Icon, Input, Divider, Grid, Header, Dropdown} from 'semantic-ui-react'
import CustomLoader from '../Misc/CustomLoader';
import AskTable from '../Table/Table';
const $ = require('jquery');

const options = [
  {
    key: '10',
    text: '10',
    value: '10',
    content: '10',
  },
  {
    key: '30',
    text: '30',
    value: '30',
    content: '30',
  },
  {
    key: '50',
    text: '50',
    value: '50',
    content: '50',
  },
  {
    key: '100',
    text: '100',
    value: '100',
    content: '100',
  },
]


class TopAsks extends Component {
    state = {
        asks : [],
        searchQuery : '',
        topN: 10
    }

    handleSearch(e, data) {
        this.setState({searchQuery : data.value});
    }

    componentDidMount() {
        $.get('/api/getNAsks/' + this.state.topN).done(function (data) {
            this.setState({asks : data});
        }.bind(this));
    }
    
    handleNumberPost (e, data) {
        console.log(data.value);
        this.setState({topN : parseInt(data.value)}, function() {
             $.get('/api/getNAsks/' + this.state.topN).done(function(data) {
                this.setState({asks: data});
            }.bind(this));
        })
        
    }


    render() {
        if (this.state.asks.length > 0) {
            return (
                <Segment basic padded>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='question' loading/>
                    Top Asks
                <Header.Subheader>
                    Based on calculated scores of posts and comments, filtered junk comment
                </Header.Subheader> 
                </Header>
                <Input onChange={(e, data) => {this.handleSearch.bind(this)(e, data)}} placeholder='Search...' />
                <Header floated='right' as='h4'>
                    <Icon name='options' />
                    <Header.Content>
                        Top
                        {' '}
                        <Dropdown inline
                                    header='# of posts'
                                    options={options}
                                    defaultValue={options[0].value}
                                    onChange={this.handleNumberPost.bind(this)} />
                    </Header.Content>
                </Header>
                <AskTable tableType='story'
                            rowData={this.state.asks}
                            colSpan={4}
                            recordPerPage={10}
                            searchQuery={this.state.searchQuery}
                            /> 
                
            </Segment>
            )
        }
        return (
            <CustomLoader />
        )
    }
}

export default TopAsks