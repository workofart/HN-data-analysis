import React from 'react';

var CommentRow = React.createClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.Text}</td>
                <td>{this.props.Kids}</td>
            </tr>
        )
    }
});

export default CommentRow;