import React, { Component } from 'react';
import {Link} from 'react-router';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Dimmer, Loader, Image, Segment} from 'semantic-ui-react';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'react-bootstrap/dist/react-bootstrap.min';
import 'semantic-ui-css/semantic.min.css';
import 'fixed-data-table/dist/fixed-data-table.css';

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
        <Link to={'topAsks/' + row.id}>{cell}</Link>
    )
}
class TopAsksTable extends Component {
    constructor() {
        super();
        this.state = {
            topAsksJSON: null
        };
    }
    componentDidMount() {
        $.get('/api/getTopAsks').done(function(data) {
            this.setState({topAsksJSON: data});
        }.bind(this));
    }
    render() {
        if (this.state.topAsksJSON) {
            return (
                <BootstrapTable data={this.state.topAsksJSON} pagination={true} search={true}
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
            <h2>Loading</h2>
        )
    }
}

// class CustomCell extends React.Component {
//     render() {
//         const {rowIndex, data, field} = this.props;
//         return (
//             <Cell>{data[rowIndex][field]}</Cell>
//         )
//     }
// }

// class LinkCell extends React.Component {
//     render() {
//         const {rowIndex, data, field} = this.props;
//         const link = data[rowIndex]['id'];
//         return (
//             <Cell><Link to={'topAsks/' + link}>{data[rowIndex][field]}</Link></Cell>
//         )
//     }
// }


// class TopAsksTable extends Component {
//
//     render() {
//
//         this.state = {
//             topAsksJSON: getTopStories()
//         };
//         console.log(this.state.topAsksJSON.length);
//         var rows = [];
//
//         // this.state.topAsksJSON.forEach(function(story, i) {
//         //     rows.push(<Column
//         //         cell={<Cell>Basic Cell Content</Cell>}
//         //         key={story.id} storyId={story.id} id={i+1} Text={story.title} Score={story.score} Kids={story.descendants} />);
//         // });
//         return (
//             <Table
//                 rowsCount={this.state.topAsksJSON.length}
//                 rowHeight={50}
//                 headerHeight={50}
//                 width={700}
//                 height={1000}>
//                 <Column
//                     header={<Cell>StoryId</Cell>}
//                     cell={
//                         <CustomCell data={this.state.topAsksJSON} field="id"/>
//                     } width={100}/>
//                 <Column
//                     header={<Cell>Title</Cell>}
//                     cell={
//                         <LinkCell data={this.state.topAsksJSON} field="title"/>
//                     } width={400}/>
//                 <Column
//                     header={<Cell>Score</Cell>}
//                     cell={
//                         <CustomCell data={this.state.topAsksJSON} field="score"/>
//                     } width={50}/>
//                 <Column
//                     header={<Cell>Descendant Comments</Cell>}
//                     cell={
//                         <CustomCell data={this.state.topAsksJSON} field="descendants"/>
//                     } width={150}/>
//             </Table>
//         );
//     }
// }

export default TopAsksTable;
