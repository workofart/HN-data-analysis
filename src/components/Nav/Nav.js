import React, { Component } from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

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
							<NavItem eventKey={1} href="#">Overview</NavItem>
							<NavItem eventKey={2} href="#">Details</NavItem>
						</Nav>
					</Navbar>
		);
	}
}

export default Navigation;
