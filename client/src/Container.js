import React, {Component} from 'react'
import Nav from './components/Nav/Nav'
import './Container.css';

class Container extends Component {
    render() {
        return (
            <div>
                <Nav />
                {this.props.children}
            </div>
        )
    }
}

export default Container;