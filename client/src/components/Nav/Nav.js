import React, { Component } from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

class Navigation extends Component {
	render() {
		return (
			<Navbar inverse fixedTop>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#">Home</a>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav>
					<LinkContainer to="/topStories">
						<NavItem eventKey={1}>Top Stories</NavItem>
					</LinkContainer>
					<LinkContainer to="/topAsks">
						<NavItem eventKey={2}>Top Asks</NavItem>
					</LinkContainer>
				</Nav>
				<Nav pullRight>
					<LinkContainer to="/login">
						<NavItem eventKey={3}>Login</NavItem>
					</LinkContainer>
				</Nav>
			</Navbar>
		);
	}
}

export default Navigation;
