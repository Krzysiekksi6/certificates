import React, { Component } from 'react';
import {
	Glyphicon,
	Grid,
	MenuItem,
	Nav,
	Navbar,
	NavDropdown,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import * as actions from './AppTemplateActions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.scss';
import MDSpinner from 'react-md-spinner';
import TermsModal from '../modal/TermsModal';

class AppTemplate extends Component {
	render() {
		const { authenticated, loading, showTermsModal } = this.props;
		return (
			<div>
				{authenticated && (
					<Navbar>
						<Navbar.Header>
							<Navbar.Brand>
								<img src='/logo.svg' className='logo' alt='logo' />
								<small>Certificates</small>
							</Navbar.Brand>
							<Navbar.Toggle />
						</Navbar.Header>
						<Navbar.Collapse>
							<Nav>
								<NavDropdown
									id='admin'
									eventKey={1}
									title={
										<span>
											<Glyphicon glyph='cog' /> Admin
										</span>
									}>
									<LinkContainer exact to='/'>
										<MenuItem eventKey={1.1}>Users</MenuItem>
									</LinkContainer>
								</NavDropdown>
								<Nav>
									<MenuItem
										onClick={this.props.actions.toggleTermsModal}
										eventKey={2.1}>
										Terms
									</MenuItem>
								</Nav>
							</Nav>

							<Nav pullRight className='vmiddle'>
								{loading && (
									<span className='pull-left'>
										<MDSpinner size={20} />
									</span>
								)}
								<NavDropdown id='user' eventKey={3} title='Profile'>
									<LinkContainer exact to='/login'>
										<MenuItem
											onClick={this.props.actions.logout}
											eventKey={3.2}>
											<Glyphicon glyph='log-out' /> Logout
										</MenuItem>
									</LinkContainer>
								</NavDropdown>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				)}
				<Grid>
					{showTermsModal && (
						<TermsModal
							show={showTermsModal}
							onClose={this.props.actions.toggleTermsModal}
						/>
					)}
					{this.props.children}
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = ({ appState, modalState }) => ({
	locale: appState.locale,
	alerts: appState.alerts,
	loading: appState.loading,
	profile: appState.profile,
	authenticated: appState.authenticated,
	showTermsModal: modalState.showTermsModal,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actions, dispatch),
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AppTemplate)
);
