import React from 'react';
import {Link} from 'react-router';

var CommentRow = React.createClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td><Link to={'topStories/' + this.props.storyId}>{this.props.Text}</Link></td>
                <td>{this.props.Kids}</td>
                <td>{this.props.Score}</td>
            </tr>
        )
    }
});

export default CommentRow;