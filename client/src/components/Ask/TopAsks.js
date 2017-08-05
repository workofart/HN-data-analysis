import React, {Component} from 'react';
import {Segment, Icon, Input, Divider, Grid, Header, Dropdown, Radio} from 'semantic-ui-react'
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
var cachedStories = [];


class TopAsks extends Component {
    state = {
        asks : [],
        searchQuery : '',
        topN: 10,
        selectedTag: []
    }

    handleSearch(e, data) {
        this.setState({searchQuery : data.value});
    }

    _intersectArr(a, b) {
        var t;
        if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
        var result = a.filter(function (e) {
            return b.indexOf(e) > -1;
        });
        return result;
    }

    componentDidMount() {
        $.get('/api/getNAsks/' + this.state.topN).done(function (data) {
            this.setState({asks : data});
            cachedStories = data;
        }.bind(this));
    }
    
    handleNumberPost (e, data) {
        console.log(data.value);
        this.setState({topN : parseInt(data.value)}, function() {
             $.get('/api/getNAsks/' + this.state.topN).done(function(data) {
                this.setState({asks: data});
                cachedStories = data;
            }.bind(this));
        })
        
    }

    filterUnTaggedStories () {
        console.log(this.state.selectedTag)
        // filter out the stories with the non-selected tags
        if (this.state.selectedTag.length > 0) {
            var filteredStory = this.state.asks.filter(function(story) {
                var tags = story.tag.toString().split(',')
                return this._intersectArr(tags, this.state.selectedTag).length === this.state.selectedTag.length ? true : false
            }.bind(this))
            this.setState({asks : filteredStory});
        }
        else {
            this.setState({asks: cachedStories})
        }
    }


    render() {
        if (this.state.asks.length > 0) {
            return (
                <Segment basic padded className='pageSegment'>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='question' loading/>
                    Top Asks
                <Header.Subheader>
                    Based on calculated scores of posts and comments, filtered junk comment
                </Header.Subheader> 
                </Header>
                <Input onChange={(e, data) => {this.handleSearch.bind(this)(e, data)}} placeholder='Search...' />
                <Radio toggle label='Display no comment stories'/>
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
                            colSpan={5}
                            recordPerPage={10}
                            searchQuery={this.state.searchQuery}
                            selectedTag={this.state.selectedTag}
                            setTag={(tag) =>{this.setState({selectedTag: tag}, () => { this.filterUnTaggedStories()})}}
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