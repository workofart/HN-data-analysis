import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Segment, Icon, Dropdown, Input } from 'semantic-ui-react';
import './Nav.css';
import $ from 'jquery';

class Navigation extends Component {
	state = { 
		activeItem: 'home',
		searchTimeOut: 0,
		loading: false
	}

  	handleItemClick = (e, { name }) => this.setState({ activeItem: name })
	//   handleItemClick = (e, {name}) => this.props.handleActivePage(name)

	handleSearch(e, data) {
		if (this.state.searchTimeOut === 0) {
			var timeout = setTimeout(() => {this.executeSearch(data)}, 250)
			this.setState({searchTimeOut : timeout})
		}
		else {
			// reset timeout
			clearTimeout(this.state.searchTimeOut);
			var timeout = setTimeout(() => {this.executeSearch(data)}, 250)
			this.setState({searchTimeOut : timeout})
			
		}
	}

	executeSearch(data) {
		
		if (data.value.length === 0) {
			this.props.toggleSidebar(false);
		}
		if (data.value.length >= 1) {
			this.setState({loading: true})
			this.props.setSearchQuery(data.value);
			this.props.toggleSidebar(true);

			// clean input
			var str = data.value.replace(' ', '|');
			$.get('/api/getStoriesByTitle/' + str).done(function(result) {
				this.props.fetchSearchResults(result);
				this.setState({loading: false});
			}.bind(this))


		}
		console.log(data.value);
	}

	render() {
		const { activeItem } = this.state

		return (
				<Menu fixed='top' borderless pointing>
					<Menu.Item as={Link} to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick}><Icon name='home' /></Menu.Item>
					<Menu.Item as={Link} to='/topStories' name='topStories' active={activeItem === 'topStories'} onClick={this.handleItemClick} />
					<Menu.Item as={Link} to='/topAsks' name='topAsks' active={activeItem === 'topAsks'} onClick={this.handleItemClick} />
					<Menu.Item as={Link} to='/tags' name='tags' active={activeItem === 'tags'} onClick={this.handleItemClick} />
					<Menu.Item as={Link} to='/users' name='users' active={activeItem === 'users'} onClick={this.handleItemClick} />
					<Menu.Menu position='right'>
						<Menu.Item>
						<Input size='large' icon={{ name:'search'}} placeholder='Search...' loading={this.state.loading} onChange={this.handleSearch.bind(this)}/>
						</Menu.Item>
						<Menu.Item as={Link} to='/about' name='about' active={activeItem === 'about'} onClick={this.handleItemClick} />
					</Menu.Menu>
					
				</Menu>
		);
	}
}

export default Navigation;
