import React from 'react';
import {Panel, Label, ListGroup, ListGroupItem} from 'react-bootstrap';


const CustomLabel = props => {
    if (props.title != null) {
        return (
            <ListGroup>
                <ListGroupItem header={props.titleLabel}>
                    {props.title}
                </ListGroupItem>
            </ListGroup>
        );
    }
    return (<div></div>);
}

const CustomPanelHeader = (
        <h1>Test</h1>
)

var BasicInfo = React.createClass({
    render: function () {
        return (
            <div>
                <Panel header={CustomPanelHeader}>
                    <CustomLabel titleLabel='Title' title={this.props.title} />
                    <CustomLabel titleLabel='Id' title={this.props.id} />
                    <CustomLabel titleLabel='Date' title={this.props.date} />
                    <CustomLabel titleLabel='Author' title={this.props.author} />
                    <CustomLabel titleLabel='Score' title={this.props.score} />
                    <CustomLabel titleLabel='Url' title={this.props.url} />
                    <CustomLabel titleLabel='Content' title={this.props.text} />
                </Panel>
            </div>
        )
    }
});

export default BasicInfo;
