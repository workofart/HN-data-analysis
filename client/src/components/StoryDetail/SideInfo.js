import React from 'react';
import {Table, Panel} from 'react-bootstrap';


const title = (
  <h3>Top Comments (with 10+ kids)</h3>
);
var SideInfo = React.createClass({
    render: function () {
        return (
            <Panel header={title}>
                <Table responsive hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Comments</th>
                        <th>Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.rows}
                    </tbody>
                </Table>
            </Panel>
        )
    }
});

export default SideInfo;
