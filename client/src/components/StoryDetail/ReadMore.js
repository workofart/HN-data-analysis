import React, {Component} from 'react';
import {Container, Accordion, Label, Icon, Button} from 'semantic-ui-react';
import './ReadMore.css';

class ReadMore extends Component {
    state = {
        active : false
    }
    
    toggleReadMore () {
        this.setState({active : !this.state.active});
    }

    render() {
        var maxDisplayLines = this.props.maxDisplayLines;
        var text = this.props.text;
        if (text) {
            return (
                <div>
                <Container text style={{ maxHeight: this.state.active ? '100%' : maxDisplayLines * 30 + 'px'}}>
                    <div dangerouslySetInnerHTML={{__html: text}} />
                    <div className='read-more' />
                </Container>
                <Icon name={ this.state.active ? 'chevron up' : 'chevron down'} onClick={this.toggleReadMore.bind(this)}/>
                </div>
            )
        }

        else {
            return <div></div>
        }
        
    }
}

export default ReadMore