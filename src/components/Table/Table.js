import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

class TableMain extends Component {
	render() {
		return (
					<Table responsive hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Id</th>
								<th>Title</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>123</td>
								<td>Test Title</td>
							</tr>
						</tbody>
					</Table>
		);
	}
}

export default TableMain;
