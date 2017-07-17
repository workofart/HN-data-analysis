import React, { Component } from 'react';
import {Statistic, Message, Container, Statistics, Button, Popup, Icon, Item, Segment, List, Label, Header, Image} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const CustomLabel = props => {
    if(props.text != null) {
        return (
            // <Header floated={props.textAlign} as='h4'>
            //     {props.label}
            //     <Header.Subheader>
            //         {props.text}
            //     </Header.Subheader>
            // </Header>
            <Label circular color='blue'>
                <Icon name={props.icon} />
                {props.text}
            </Label>
        );
    }
    return (<div></div>);
}

const CustomPanelHeader = (
        <h1>Basic </h1>
)


class BasicInfo extends Component{
    render () {
        return (
                <Segment basic textAlign='center'>
                    
                    {/* <CustomLabel  textAlign='left' label='Id' text={this.props.id} />
                    <CustomLabel  textAlign='left' label='Date' text={this.props.date} />
                    <CustomLabel  textAlign='left' label='Author' text={this.props.author} /> */}
                    {/* <Label.Group>
                        <CustomLabel icon='thumbs outline up' textAlign='left' label='Score' text={this.props.score} />
                        
                        <CustomLabel textAlign='left' label='Content' text={this.props.text} />
                        
                        <Popup
                            trigger={<Label circular color='blue' icon='exchange' content='Related'/>}
                            content={'Test related story'}
                            hideOnScroll />
                    </Label.Group> */}
                    <Statistic size='mini' label='Score' value={this.props.score} />
                    <Statistic size='mini' label='Comments' value={this.props.kids} />
                    <Label>
                        <Icon fitted as='a' href={this.props.url} name='linkify'/>
                    </Label>
                </Segment>
        )
    }
};

export default BasicInfo;
