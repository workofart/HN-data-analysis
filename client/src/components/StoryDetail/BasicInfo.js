import React from 'react';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Statistic, Message, Item, Segment, List, Label, Header, Image} from 'semantic-ui-react';
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
            <List.Item>
                <Label size='huge' color='grey' horizontal>{props.titleLabel}</Label>
                {props.title}
            </List.Item>
        );
    }
    return (<div></div>);
}

const CustomPanelHeader = (
        <h1>Basic </h1>
)


var BasicInfo = React.createClass({
    render: function () {
        return (
            <Segment textAlign='left' color='red' raised>
                <Header as='h2'>
                    <Image size='small' src={process.env.PUBLIC_URL + '/img/post.png' }/>
                    Post Details
                </Header>
                <Item>
                    <Item.Content>
                        <List divided size='big'>
                            <CustomLabel titleLabel='Title' title={this.props.title} />
                            <CustomLabel titleLabel='Id' title={this.props.id} />
                            <CustomLabel titleLabel='Date' title={this.props.date} />
                            <CustomLabel titleLabel='Author' title={this.props.author} />
                            <CustomLabel titleLabel='Score' title={this.props.score} />
                            <CustomLabel titleLabel='Url' title={this.props.url} />
                            <CustomLabel titleLabel='Content' title={this.props.text} />
                        </List>
                    </Item.Content>
                </Item>
            </Segment>
        )
    }
});

export default BasicInfo;
