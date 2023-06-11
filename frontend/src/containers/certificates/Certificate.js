import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
	Button,
	Col,
	ControlLabel,
	Form,
	FormControl,
	FormGroup,
	Glyphicon,
	Row,
} from 'react-bootstrap';
import * as certificateActions from './CertificatesApi';
import * as actions from '../users/UsersApi';

class Certificate extends Component {
	handleNameChange = (e) => {
		const { resource } = this.state;
		this.setState({ resource: { ...resource, name: e.target.value } });
	};

	handleDescriptionChange = (e) => {
		const { resource } = this.state;
		this.setState({ resource: { ...resource, description: e.target.value } });
	};

	handleUserChange = (e) => {
		const { resource } = this.state;
		this.setState({
			resource: { ...resource },
			userId: e.target.value,
		});
	};

	saveCertificate = (e) => {
		e.preventDefault();
		const { resource, userId } = this.state;
		const validationErrors = {};

		if (!resource.name) {
			validationErrors.name = 'invalid name';
		}
		if (!resource.description || resource.description.trim() === '') {
			validationErrors.description = 'invalid description';
		}

		if (Object.keys(validationErrors).length > 0) {
			this.setState({ validationErrors });
		} else {
			this.props.actions.saveCertificate({ ...resource, userId }, () => {
				this.props.history.push('/users');
			});
		}
	};

	constructor(props, context) {
		super(props, context);

		this.state = {
			resource: {},
			validationErrors: {},
			users: null,
			page: 1,
			sizePerPage: 10,
			userId: '',
		};
	}

	reload() {
		const { match } = this.props;
		const { page, sizePerPage } = this.state;
		const { id, userId } = match.params;
		if (id) {
			this.loadCertificate(id, (certificate) => {
				this.setState({ resource: certificate });
			});
		} else {
			this.setState({ resource: {} });
		}

		this.props.actions.loadUsers(
			{ page: page, per_page: sizePerPage },
			(users) =>
				this.setState({ users, page, sizePerPage, userId })
		);
	}

	componentDidMount() {
		this.reload();
	}

	loadCertificate(id) {
		this.props.actions.loadCertificate(id, (resource) =>
			this.setState({
				resource: resource,
			})
		);
	}

	getValidationState(id) {
		const { validationErrors } = this.state;
		if (validationErrors && validationErrors[id]) {
			return 'error';
		}
		return null;
	}

	render() {
		const { resource, validationErrors, users, userId } = this.state;
		return (
			<div>
				{resource && (
					<Row className='vertical-middle breadcrumbs'>
						<Col xs={8}>
							<h5>
								<Glyphicon glyph='cog' /> {'Admin > Certificate > '}
								{resource.id ? (
									<span>
										<b>{resource.name}</b> - edit
									</span>
								) : (
									<span>New</span>
								)}
							</h5>
						</Col>
					</Row>
				)}
				{resource && (
					<Row id='form'>
						<Col xs={12} md={6}>
							<Form horizontal onSubmit={this.saveCertificate}>
								<FormGroup
									controlId='name'
									validationState={this.getValidationState('name')}>
									<Col componentClass={ControlLabel} sm={2}>
										Name
									</Col>
									<Col sm={10}>
										<FormControl
											type='text'
											defaultValue={resource.id ? resource.name : ''}
											value={resource.name}
											placeholder='Enter name'
											onChange={this.handleNameChange}
										/>
										{Object.keys(validationErrors).length > 0 &&
											validationErrors.name && (
												<ControlLabel>{validationErrors.name}</ControlLabel>
											)}
									</Col>
								</FormGroup>
								<FormGroup controlId='description'>
									<Col componentClass={ControlLabel} sm={2}>
										Description
									</Col>
									<Col sm={10}>
										<FormControl
											componentClass='textarea'
											value={resource.description}
											placeholder='Enter description'
											onChange={this.handleDescriptionChange}
										/>
										{Object.keys(validationErrors).length > 0 &&
											validationErrors.description && (
												<ControlLabel>
													{validationErrors.description}
												</ControlLabel>
											)}
									</Col>
								</FormGroup>
								<FormGroup controlId='user'>
									<Col componentClass={ControlLabel} sm={2}>
										User
									</Col>
									<Col sm={10}>
										<FormControl
											componentClass='select'
											value={userId}
											onChange={this.handleUserChange}>
											{users &&
												users.length > 0 &&
												users.map((user) => (
													<option key={user.id} value={user.id}>
														{user.email}
													</option>
												))}
										</FormControl>
									</Col>
								</FormGroup>
								<Col xsOffset={2} xs={10} className='form-buttons margin10'>
									<Button type='submit' bsStyle='success'>
										Save
									</Button>
									<Button
										bsStyle='warning'
										onClick={() => this.props.history.push('/users')}>
										Cancel
									</Button>
								</Col>
							</Form>
						</Col>
					</Row>
				)}
			</div>
		);
	}
}

Certificate.contextTypes = {
	router: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
	actions: {
		...bindActionCreators(actions, dispatch),
		...bindActionCreators(certificateActions, dispatch),
	},
});

export default connect(undefined, mapDispatchToProps)(Certificate);
