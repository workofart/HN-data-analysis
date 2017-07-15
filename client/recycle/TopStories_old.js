import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Link} from 'react-router-dom';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-bootstrap/dist/react-bootstrap.min';
import {Dimmer, Loader, Image, Segment} from 'semantic-ui-react';
var _ = require('underscore');
var $ = require('jquery');


const CustomLoader = () => (
    <Segment>
        <Dimmer active>
            <Loader size='massive'/>
        </Dimmer>
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>
)

function getCaret(direction) {
    if (direction === 'asc') {
        return (
            <span className="glyphicon glyphicon-sort-by-attributes"/>
        )
    }
    if (direction === 'desc') {
        return (
            <span className="glyphicon glyphicon-sort-by-attributes-alt"/>
        )
    }
    return (
        <span className="glyphicon glyphicon-sort"/>
    )
}

function afterSearch(query, result) {
    console.log('Search query: ' + query);
    // console.log('Result: ' + result);
}

const searchCallBackOptions = {
    afterSearch: afterSearch,
    clearSearch: true,
    searchDelayTime: 350,
    paginationShowsTotal: true,
    sizePerPage: 20,
    pageStartIndex: 1,
    paginationSize: 3
}

const paginationOptions = {
    paginationShowsTotal: true,
    sizePerPage: 20,
    pageStartIndex: 1
}

function linkFormatter(cell, row) {
    return (
        <Link to={'topStories/' + row.id}>{cell}</Link>
    )
}
class TopStoriesTable extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            topStoriesJSON: null
        };
    }
    componentDidMount() {
        $.get('/api/getTopStories').done(function(data) {
            this.setState({topStoriesJSON: data});
        }.bind(this));
    }
    render() {
        if(this.state.topStoriesJSON) {
            return (
                <BootstrapTable data={this.state.topStoriesJSON} pagination={true} search={true}
                                options={searchCallBackOptions} striped hover>
                    <TableHeaderColumn isKey searchable={true} className='alert-info' dataField='id' width='100'>Story
                        ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='title' className='alert-info' headerAlign='center'
                                       dataFormat={linkFormatter} width='500'>Title</TableHeaderColumn>
                    <TableHeaderColumn dataField='score' className='alert-info' headerAlign='center'
                                       caretRender={getCaret} searchable={false} dataSort={true}
                                       width='100'>Score</TableHeaderColumn>
                    <TableHeaderColumn dataField='descendants' className='alert-info' headerAlign='center'
                                       caretRender={getCaret} searchable={false} dataSort={true}>#
                        Comments</TableHeaderColumn>
                </BootstrapTable>
            );
        }
        return (
            <CustomLoader/>
        )
    }
}


// class TopStoriesTable extends Component {
//     render() {
//
//         this.state = {
//             topAsksJSON: getTopStories()
//         };
//
//         var rows = [];
//         this.state.topAsksJSON.forEach(function(story, i) {
//             rows.push(<StoryRow key={story.id} storyId={story.id} id={i+1} Text={story.title} Score={story.score} Kids={story.descendants} />);
//         });
//         return (
//             <Table responsive hover>
//                 <thead>
//                 <tr>
//                     <th>#</th>
//                     <th>Title</th>
//                     <th>Score</th>
//                     <th>Comments</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {rows}
//                 </tbody>
//             </Table>
//         );
//     }
// }

export default TopStoriesTable;
