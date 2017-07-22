import React, { Component } from 'react';
import {Table, Menu, Label, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import './TaggedStoryTable.css';
import Pagination from '../Table/Pagination';

class TaggedStoryTable extends Component {
    state = {
        selectedTag : [],
        currentPage: 1
    }

    // componentDidUpdate() {
        // shuffling should reset the selected tag
        // if (this.props.selectedTag == '') {
        //     this.setState({selectedTag: ''})
        // }
    // }

    _intersectArr(a, b) {
        var t;
        if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
        var result = a.filter(function (e) {
            return b.indexOf(e) > -1;
        });
        return result;
    }

     _addNotification (event, msg) {
        event.preventDefault();
        this.props.notificationSystem.addNotification({
        message: msg,
        level: 'success',
        position: 'tc',
        autoDismiss: 1
        });
    }


    getTagsPage(item, e) {
        var currentTags = this.props.selectedTag.slice();
        var newTags = currentTags.concat(item);
        // console.log(this.state.selectedTag);
        // console.log('Total items: ' + newTags);
        // console.log(newTags);
        this.setState({selectedTag: newTags}, (newTags) =>{this.props.setTag(this.props.selectedTag.concat(item));})
        this._addNotification(e, 'Filtering tags: [' + newTags.toString() + ']');
    }

    clearTags() {
        this.setState({selectedTag: []}, () =>{this.props.setTag([])})
    }

    convertToTags(tags) {
        return tags.split(',').map(function(item) {
            return <Label color='teal' size='medium' key={item} as='button' onClick={(e) => {this.getTagsPage(item, e)}}>{item}</Label>
        }.bind(this))
    }

    generateTableRows(start, end) {
        var stories = this.props.stories;

        var row = [];
        
        row = stories.map(function(item, i) {
            // console.log(item.tag.split(','))
            // console.log(this._intersectArr(item.tag.split(','), this.state.selectedTag.slice()))
            return (
                // <Table.Row key={i} style={{ display: this._intersectArr(item.tag.split(','), this.state.selectedTag.slice()).length == this.state.selectedTag.length || this.props.selectedTag.length === 0 ? '' : 'none'}}>
                <Table.Row key={i}>
                    <Table.Cell collapsing key={i + item.id}>
                        <Link to={'/story/' + item.id}>{item.id}</Link>
                    </Table.Cell>
                    <Table.Cell key={i + item.title}>
                        <Link to={'/story/' + item.id}>{item.title}</Link>
                    </Table.Cell>
                    <Table.Cell collapsing key={i + item.tag}>{this.convertToTags(item.tag)}</Table.Cell>
                </Table.Row>
            )
            
        }.bind(this));

        row = row.slice(start, end);
        return row;
    }

    generateTableBody(rowSliceBeg, rowSliceEnd) {
        return (
            <Table.Body>
                {this.generateTableRows(rowSliceBeg, rowSliceEnd)}
            </Table.Body>
        )
    }
    render() {
        var rowSliceBeg = this.props.recordPerPage * (this.state.currentPage - 1)
        var rowSliceEnd = this.state.currentPage * this.props.recordPerPage
        
        return (
            <Table size='large' basic='very' celled selectable>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell collapsing>Story Id</Table.HeaderCell>
                    <Table.HeaderCell collapsing>Title</Table.HeaderCell>
                    <Table.HeaderCell collapsing>
                        Tag
                        <Label color='blue' style={{ display : this.props.selectedTag != [] ? '' : 'none'}}>
                            <Icon name='filter' />{this.props.selectedTag.toString()}
                            <Icon name='delete' onClick={ () => {this.clearTags()}}/>
                        </Label>
                    </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                {this.generateTableBody(rowSliceBeg, rowSliceEnd)}

                <Pagination colSpan={this.props.colSpan}
							recordPerPage={this.props.recordPerPage}
							totalRecords={this.props.stories.length}
							parentSwitchPage={(p) => {this.setState({currentPage : p})}}/>
            </Table>
        )
    }
}

export default TaggedStoryTable