import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Segment, Icon, Dropdown, Input, Header } from 'semantic-ui-react';
import './Nav.css';
import $ from 'jquery';

class Navigation extends Component {
	state = { 
		activeItem: 'home',
		searchTimeOut: 0,
		searchValue: '',
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
			this.setState({loading: true, searchValue : data})
			this.props.setSearchQuery(data.value);
			this.props.toggleSidebar(true);

			// clean input
			var str = data.value.replace(' ', '|');
			$.get('/api/getStoriesByTitle/' + str)
			.fail(function() {
				this.props.fetchSearchResults([{title : 'No results'}]);
				this.setState({loading: false});
			}.bind(this))
			.done(function(result) {
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
					<Menu.Item as={Header} size='small' >{this.props.stickyTitle}</Menu.Item>
					<Menu.Menu position='right'>
						{/* <Menu.Item> */}
						<Input icon={<Icon className='searchIcon' name='search' circular link onClick={ (e) => {this.handleSearch.bind(this)(e, this.state.searchValue) }} />}  placeholder='Search...' loading={this.state.loading} onChange={this.handleSearch.bind(this)}/>
						{/* </Menu.Item> */}
						<Menu.Item as={Link} to='/about' name='about' active={activeItem === 'about'} onClick={this.handleItemClick} />
					</Menu.Menu>
					
				</Menu>
		);
	}
}

export default Navigation;
