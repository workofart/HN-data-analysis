import React, { Component } from 'react';
// import {Navbar, Nav, NavItem} from 'react-bootstrap';
// import {LinkContainer} from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Menu, Segment, Icon } from 'semantic-ui-react';
import './Nav.css';

class Navigation extends Component {
	state = { activeItem: 'home' }

  	handleItemClick = (e, { name }) => this.setState({ activeItem: name })
	//   handleItemClick = (e, {name}) => this.props.handleActivePage(name)

	render() {
		const { activeItem } = this.state

		return (
				<Menu fixed='top' borderless pointing>
					<Menu.Item as={Link} to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick}><Icon name='home' /></Menu.Item>
					<Menu.Item as={Link} to='/topStories' name='topStories' active={activeItem === 'topStories'} onClick={this.handleItemClick} />
					<Menu.Item as={Link} to='/topAsks' name='topAsks' active={activeItem === 'topAsks'} onClick={this.handleItemClick} />
					<Menu.Item as={Link} to='/stories' name='stories' active={activeItem === 'stories'} onClick={this.handleItemClick} />
					<Menu.Menu position='right'>
						<Menu.Item name='test' active={activeItem === 'test'} onClick={this.handleItemClick} />
					</Menu.Menu>
				</Menu>
		);
	}
}

export default Navigation;
