import React, { Component } from 'react';
import {Statistic, Message, Container, Statistics, Button, Popup, Icon, Item, Segment, List, Label, Header, Image} from 'semantic-ui-react';
import CustomLoader from '../Misc/CustomLoader';
import ReadMore from './ReadMore';
import 'semantic-ui-css/semantic.min.css';
import './BasicInfo.css';

const _ = require('underscore');

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
        if (Object.keys(this.props.tags).length > 0) {
            var tags = _.uniq(this.props.tags.tag);

            tags = tags.map(function(tag) {
                return <Label key={tag} color='olive'>{tag}</Label>
            })

                return (
                    <div>
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
                        <Label circular color='blue' as='a' href={this.props.url}>
                            <Icon fitted name='linkify'/>
                        </Label>
                        <ReadMore maxDisplayLines={4} text={this.props.text}/>
                    </Segment>
                    <Segment basic textAlign='center'>
                        {tags}
                    </Segment>
                    </div>
            )
        }
        else {
            return <CustomLoader />
        }
        
        
    }
};

export default BasicInfo;
