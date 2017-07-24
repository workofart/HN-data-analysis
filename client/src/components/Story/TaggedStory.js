import React, { Component } from 'react';
import {Label, Icon, Header, Segment, Card} from 'semantic-ui-react';
import NotificationSystem from 'react-notification-system';
import CustomTagCard from './TagCard/CustomTagCard';
import './TaggedStory.css';

import $ from 'jquery';
const categories = [
    'Social','Startups','Science','Business/Finance',
    'Software Development','Technology','Society/Economics',
    'Software','Entertainment','Web Infrastructure/Technologies',
    'Innovation','Programming','Finance/Stock Market','Education',
    'Security','Websites','Resource','Health/Body', 'Database',
    'Product/Startup','Legal','Politics','Web','Job'
]

class Story extends Component {
    state = {
        selectedCategories : []
    }

    addToSelection(category) {
        var index = this.state.selectedCategories.indexOf(category);
        var newCategory;
        if (index > -1) {
            newCategory = this.state.selectedCategories.slice()
            delete newCategory[index];
        }
        else {
            newCategory = this.state.selectedCategories.concat(category);
        }
        this.setState({selectedCategories : newCategory})
    }

    render() {
        var cards = [];
        categories.forEach(function(cat) {
            cards.push(<CustomTagCard
                key={cat} 
                header={cat}
                addToSelection={() => {this.addToSelection(cat)}}/>)

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
                <Card.Group stackable itemsPerRow={6}>
                    {cards}
                </Card.Group>
                {this.state.selectedCategories}
            </Segment>
        )
    }
}

export default Story