import React, { Component } from 'react';
import {Table, Label, Icon} from 'semantic-ui-react';
import CommentRow from './Row/CommentRow';
import StoryRow from './Row/StoryRow';
import Pagination from './Pagination';
import CustomLoader from '../Misc/CustomLoader';
var _ = require('underscore');


const StoryTableHeader = (props) =>
		<Table.Row>
			<Table.HeaderCell>#</Table.HeaderCell>
			<Table.HeaderCell>Title</Table.HeaderCell>
			<Table.HeaderCell>Score</Table.HeaderCell>
			<Table.HeaderCell>Decendents</Table.HeaderCell>
			<Table.HeaderCell collapsing>
				Tag
				<Label color='blue' style={{ display : props.props.selectedTag != [] ? '' : 'none'}}>
					<Icon name='filter' />{props.props.selectedTag.toString()}
					<Icon name='delete' onClick={ () => {props.clearTags()}}/>
				</Label>
			</Table.HeaderCell>
		</Table.Row>

const CommentTableHeader = () =>
		<Table.Row>
			<Table.HeaderCell>#</Table.HeaderCell>
			<Table.HeaderCell>Comment</Table.HeaderCell>
			<Table.HeaderCell>Comments</Table.HeaderCell>
		</Table.Row>

class TableMain extends Component {
	state = {
			// commentJSON: []
			currentPage : 1,
			loading: true,
			selectedTag: []
	}

	componentDidMount() {
		if (this.props.rowData) {
			this.setState({loading: false})
		}
	}

	_intersectArr(a, b) {
        var t;
        if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
        var result = a.filter(function (e) {
            return b.indexOf(e) > -1;
        });
        return result;
    }
	
	clearTags() {
        this.setState({selectedTag: []}, () =>{this.props.setTag([])})
    }

	render() {	

		var rows = [];

		var TableRow = this.props.tableType === 'story' ? StoryRow : CommentRow;
		var TableHeader = this.props.tableType === 'story' ? StoryTableHeader : CommentTableHeader;
		if (this.props.tableType === 'story') {
			console.log(this.props.rowData[0])
			this.props.rowData.forEach(function(data, i) {
				rows.push(<TableRow key={data.id} 
									id={i+1} 
									storyId={data.id} 
									text={data.title} 
									score={data.score} 
									kids={data.descendants} 
									tags={data.tag} 
									selectedTag={this.state.selectedTag}
									setTag={(tag) => {this.setState({selectedTag: tag}); this.props.setTag(tag); this.setState({currentPage: 1})}}/>);
			}.bind(this));
		}
		else {
			this.props.rowData.forEach(function(data, i) {
				rows.push(<TableRow key={data.id} id={data.id} text={data.text} kids={data.decendents} />);
			});
		}
		rows = rows.filter(function(item) {
			return item.props.text.toUpperCase().includes(this.props.searchQuery.toUpperCase())
		}.bind(this))
		
		var rowSliceBeg = this.props.recordPerPage * (this.state.currentPage - 1)
		var rowSliceEnd = this.state.currentPage * this.props.recordPerPage

		if (!this.state.loading) {
			return (
				<Table size='large' color='orange'>
					<Table.Header>
						{TableHeader(this)}
					</Table.Header>
					<Table.Body>
						{rows.slice(rowSliceBeg,rowSliceEnd)}
					</Table.Body>

					<Pagination colSpan={this.props.colSpan}
								recordPerPage={this.props.recordPerPage}
								totalRecords={this.props.rowData.length}
								parentSwitchPage={(p) => {this.setState({currentPage : p})}}
								currentPage={this.state.currentPage}/>
				</Table>
			);
		}
		return <CustomLoader />
	}
}

export default TableMain;
