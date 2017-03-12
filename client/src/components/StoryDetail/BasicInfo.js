import React from 'react';
import {Panel, Label, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Statistic, Message} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


// const CustomLabel = props => {
//     if (props.title != null) {
//         return (
//             <ListGroup>
//                 <ListGroupItem header={props.titleLabel}>
//                     {props.title}
//                 </ListGroupItem>
//             </ListGroup>
//         );
//     }
//     return (<div></div>);
// }

const CustomLabel= props => {
    if(props.title != null) {
        return (
            <Message info>
                <Message.Header>{props.titleLabel}</Message.Header>
                <p>{props.title}</p>
            </Message>
        );
    }
    return (<div></div>);
}

const CustomPanelHeader = (
        <h1>Basic </h1>
)

// var BasicInfo = React.createClass({
//     render: function () {
//         return (
//             <div>
//                 <Panel header={CustomPanelHeader}>
//                     <CustomLabel titleLabel='Title' title={this.props.title} />
//                     <CustomLabel titleLabel='Id' title={this.props.id} />
//                     <CustomLabel titleLabel='Date' title={this.props.date} />
//                     <CustomLabel titleLabel='Author' title={this.props.author} />
//                     <CustomLabel titleLabel='Score' title={this.props.score} />
//                     <CustomLabel titleLabel='Url' title={this.props.url} />
//                     <CustomLabel titleLabel='Content' title={this.props.text} />
//                 </Panel>
//             </div>
//         )
//     }
// });

var BasicInfo = React.createClass({
    render: function () {
        return (
            <div>
                <CustomLabel titleLabel='Title' title={this.props.title} />
                <CustomLabel titleLabel='Id' title={this.props.id} />
                <CustomLabel titleLabel='Date' title={this.props.date} />
                <CustomLabel titleLabel='Author' title={this.props.author} />
                <CustomLabel titleLabel='Score' title={this.props.score} />
                <CustomLabel titleLabel='Url' title={this.props.url} />
                <CustomLabel titleLabel='Content' title={this.props.text} />
            </div>
        )
    }
});

export default BasicInfo;
