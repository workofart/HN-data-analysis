import React, { Component } from 'react';
import {Label, Icon, Header, Button, Container, Segment, Card, Radio, Grid} from 'semantic-ui-react';
import NotificationSystem from 'react-notification-system';
import CustomTagCard from './TagCard/CustomTagCard';
import StoryModal from './StoryModal';
import './TaggedStory.css';

import $ from 'jquery';
const categories = [
    'Social','Startups','Science','Business / Finance',
    'Software Development','Technology','Society / Economics',
    'Software','Entertainment','Web Infrastructure / Technologies',
    'Innovation','Programming','Finance / Stock Market','Education',
    'Security','Websites','Resource','Health / Body', 'Database',
    'Product / Startup','Legal','Politics','Web','Job'
]

class Story extends Component {
    state = {
        selectedCategories : [],
        displayNoComments: false
    }

    toggleDisplayNoComments() {
        this.setState({displayNoComments : !this.state.displayNoComments});
    }

    addToSelection(category) {
        var index = this.state.selectedCategories.indexOf(category);
        var newCategory;
        if (index > -1) {
            newCategory = this.state.selectedCategories.slice()
            newCategory.splice(index, 1);
            // delete newCategory[index];
            // console.log(newCategory);
            this.setState({selectedCategories : newCategory})
            return true;
        }
        else {
            if (this.state.selectedCategories.length < 3) {
                newCategory = this.state.selectedCategories.concat(category);
                this.setState({selectedCategories : newCategory})
                return true;
            }
        }
        return false;
    }

 

    exploreRender() {
            if (this.state.selectedCategories.length != 0) {
                return (
                    <Container style={{ marginTop: '60px'}} textAlign='center'>
                        <StoryModal
                            displayNoComments={this.state.displayNoComments}
                            selectedCategories={this.state.selectedCategories}/>
                    </Container>
                )
            }
    }

    render() {
        var cards = [];
        categories.forEach(function(cat) {
            cards.push(<CustomTagCard
                key={cat} 
                header={cat}
                addToSelection={() => {return this.addToSelection(cat)}}/>)

        }.bind(this))

        

        return (
            <Segment padded basic className='pageSegment'>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='tag'/>
                    Select your favourite tags
                <Header.Subheader>
                    You can select multiple tags (up to 3) at once, click again to deselect
                </Header.Subheader> 
                </Header>
                <Radio toggle label='Hide stories w/o comments' onChange={this.toggleDisplayNoComments.bind(this)}/>
                <Card.Group stackable itemsPerRow={5}>
                    {cards}
                </Card.Group>
                {this.exploreRender()}
            </Segment>
        )
    }
}

export default Story