import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Link} from 'react-router';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'react-bootstrap/dist/react-bootstrap.min';
var _ = require('underscore');
var $ = require('jquery');


function getTopStories() {
    var url = '/api/getTopStories';
    return JSON.parse($.ajax({url: url,
        type: 'get',
        async: false

    }).responseText);

}

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
    render() {

        this.state = {
            topStoriesJSON: getTopStories()
        };

        return (
            <BootstrapTable data={this.state.topStoriesJSON} pagination={true} search={true} options={searchCallBackOptions} striped hover>
                <TableHeaderColumn isKey searchable={true} className='alert-info' dataField='id' width='100'>Story ID</TableHeaderColumn>
                <TableHeaderColumn dataField='title' className='alert-info' headerAlign='center' dataFormat={linkFormatter} width='500'>Title</TableHeaderColumn>
                <TableHeaderColumn dataField='score' className='alert-info' headerAlign='center' caretRender={getCaret} searchable={false} dataSort={true} width='100'>Score</TableHeaderColumn>
                <TableHeaderColumn dataField='descendants' className='alert-info' headerAlign='center' caretRender={getCaret} searchable={false} dataSort={true}># Comments</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}


// class TopStoriesTable extends Component {
//     render() {
//
//         this.state = {
//             topStoriesJSON: getTopStories()
//         };
//
//         var rows = [];
//         this.state.topStoriesJSON.forEach(function(story, i) {
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
