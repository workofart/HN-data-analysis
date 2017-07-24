import React , { Component } from 'react';
import {Label, Icon, Header, Segment, Card} from 'semantic-ui-react';
import './CustomTagCard.css';

const activeCSS = {
    // bottom: '60px',
    // left: '10px',
    // position: 'absolute',
    // transform: 'translateX(-40px) translateY(500px)',
    // transform: 'rotateY(180deg)',
    backgroundColor: 'rgba(238, 213, 180, 0.77)'
    // transition: 'all 1s ease-in-out'
}

class CustomTagCard extends Component {
    state = {
        active: false
    }

    addToSelection(props) {
        this.props.addToSelection(props.category);
        this.setState({active: !this.state.active})
    }

    

    render() {
        
        return (
            <Card style={this.state.active ? activeCSS : {}} centered raised color='red' onClick={(props) => {this.addToSelection(props)}}>
                <Card.Content>
                    <Card.Header>{this.props.header}</Card.Header>
                    {/* <Card.Meta>{this.props.numPosts}</Card.Meta> */}
                    <Card.Description>{this.props.desc}</Card.Description>
                </Card.Content>
            </Card>
        )
    }
}

export default CustomTagCard