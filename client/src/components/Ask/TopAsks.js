import React, { Component } from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import {Link} from 'react-router';

import 'fixed-data-table/dist/fixed-data-table.css';

var _ = require('underscore');
var $ = require('jquery');

function getTopStories() {
    var url = '/api/getTopAsks';
    console.log('getting top asks');
    return JSON.parse($.ajax({url: url,
        type: 'get',
        async: false

    }).responseText);

}


class CustomCell extends React.Component {
    render() {
        const {rowIndex, data, field} = this.props;
        return (
            <Cell>{data[rowIndex][field]}</Cell>
        )
    }
}

class LinkCell extends React.Component {
    render() {
        const {rowIndex, data, field} = this.props;
        const link = data[rowIndex]['id'];
        return (
            <Cell><Link to={'topAsks/' + link}>{data[rowIndex][field]}</Link></Cell>
        )
    }
}


class TopAsksTable extends Component {
    // componentDidMount() {
    //     $('#table').bootstrapTable({
    //         columns: [{
    //             field: 'id',
    //             title: 'Ask Id'
    //         },{
    //             field: 'title',
    //             title: 'Story Title'
    //         }],
    //         data: getTopStories()
    //
    //     });
    // }

    render() {

        this.state = {
            topStoriesJSON: getTopStories()
        };
        console.log(this.state.topStoriesJSON.length);
        var rows = [];

        // this.state.topStoriesJSON.forEach(function(story, i) {
        //     rows.push(<Column
        //         cell={<Cell>Basic Cell Content</Cell>}
        //         key={story.id} storyId={story.id} id={i+1} Text={story.title} Score={story.score} Kids={story.descendants} />);
        // });
        return (
            <Table
                rowsCount={this.state.topStoriesJSON.length}
                rowHeight={50}
                headerHeight={50}
                width={700}
                height={1000}>
                <Column
                    header={<Cell>StoryId</Cell>}
                    cell={
                        <CustomCell data={this.state.topStoriesJSON} field="id"/>
                    } width={100}/>
                <Column
                    header={<Cell>Title</Cell>}
                    cell={
                        <LinkCell data={this.state.topStoriesJSON} field="title"/>
                    } width={400}/>
                <Column
                    header={<Cell>Score</Cell>}
                    cell={
                        <CustomCell data={this.state.topStoriesJSON} field="score"/>
                    } width={50}/>
                <Column
                    header={<Cell>Descendant Comments</Cell>}
                    cell={
                        <CustomCell data={this.state.topStoriesJSON} field="descendants"/>
                    } width={150}/>
            </Table>
        );
    }
}

export default TopAsksTable;
