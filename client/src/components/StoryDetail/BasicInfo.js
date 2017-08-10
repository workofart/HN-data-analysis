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
                    <Segment className='statsSegment' basic textAlign='center'>
                        <Statistic size='mini' label='Score' value={this.props.score} />
                        <Statistic size='mini' label='Comments' value={this.props.kids} />
                        
                        <ReadMore maxDisplayLines={4} text={this.props.text}/>
                    </Segment>
                    <Segment className='iconSegment' clearing size='mini' basic textAlign='center'>
                        <Label circular color='blue' as='a' href={this.props.url}>
                            <Icon fitted name='linkify'/>
                        </Label>
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
