import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Segment, Icon, Dropdown } from 'semantic-ui-react';
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
					<Menu.Item as={Link} to='/tags' name='tags' active={activeItem === 'tags'} onClick={this.handleItemClick} />
					<Menu.Item as={Link} to='/users' name='users' active={activeItem === 'users'} onClick={this.handleItemClick} />
					<Menu.Item position='right' as={Link} to='/about' name='about' active={activeItem === 'about'} onClick={this.handleItemClick} />
				</Menu>
		);
	}
}

export default Navigation;
