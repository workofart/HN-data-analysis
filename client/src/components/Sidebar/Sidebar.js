import React, { Component } from 'react';
import { Menu, Header, Segment, Icon, Label, List} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import $ from 'jquery';


const resultRow = (data, action) => {
    return (
        <List.Item key={data.id}>
            <List.Content>
                <List.Header>
                    <Link onClick={ () => {action(false)}} to={'/story/' + data.id}>{data.title}</Link>
                </List.Header>
            </List.Content>
        </List.Item>
    )
}

class Sidebar extends Component {

    render() {
        
        var resultRows = this.props.searchResults.map(function(item) {
            return (
                resultRow(item, this.props.toggleVisibility)
            )
        }.bind(this))

        return (
            <List divided relaxed>{resultRows}</List>
        )
    }
}

export default Sidebar