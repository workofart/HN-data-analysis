import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import CommentRow from '../CommentRow/CommentRow';
var _ = require('underscore');
var commentJSON = require('../../data/test.json');

class TableMain extends Component {
	render() {
		this.state = {
			commentJSON: commentJSON
		};

		var rows = [];
		this.state.commentJSON.forEach(function(comment, i) {
			rows.push(<CommentRow key={comment.id} id={i+1} Text={comment.text} Kids={comment.decendents} />);
		});
		return (
					<Table responsive hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Comment</th>
								<th>Popularity</th>
							</tr>
						</thead>
						<tbody>
						{rows}
						</tbody>
					</Table>
		);
	}
}

export default TableMain;
