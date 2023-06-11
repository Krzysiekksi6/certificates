import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
	Button,
	Col,
	Glyphicon,
	OverlayTrigger,
	Row,
	Tooltip,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import * as actions from './CertificatesApi';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class Certificates extends Component {
	state = {
		certificates: [],
		page: 1,
		sizePerPage: 10,
		userId: null,
	};

	componentDidMount() {
		this.reload();
	}

	reload() {
		const { page, sizePerPage } = this.state;
		const userId = this.props.match.params.id;
        console.log("UserId", userId);
		if (userId !== null) {
			this.props.actions.loadCertificates({ page, sizePerPage }, (items) => {
				return this.setState({
					certificates: items.filter((item) => item.userId === userId),
					page,
					sizePerPage,
					userId,
				});
			});
		} else {
			this.setState({ certificates: {} });
		}
	}

	delete(id) {
		this.props.actions.deleteCertificate(id, () => {
			this.reload();
			this.props.history.push('/users');
		});
	}

	render() {
		const { certificates, userId } = this.state;

		return (
			<div>
				<Row className='vertical-middle breadcrumbs'>
					<Col xs={8}>
						<h5>
							<Glyphicon glyph='cog' /> {'Admin > Certificates'}
						</h5>
					</Col>
					<Col xs={4} className='text-right'>
						<LinkContainer exact to={`/user/${userId}/certificate/add`}>
							<Button bsStyle={'success'}>
								<Glyphicon glyph='plus' /> Add
							</Button>
						</LinkContainer>
					</Col>
				</Row>
				{certificates && (
					<BootstrapTable
						data={certificates}
						fetchInfo={{ dataTotalSize: certificates.length }}
						striped
						hover
						remote
						pagination
						bordered={false}>
						<TableHeaderColumn width='10' isKey dataField='id'>
							ID
						</TableHeaderColumn>
						<TableHeaderColumn width='35' dataField='name'>
							Name
						</TableHeaderColumn>
						<TableHeaderColumn
							width='20'
							dataField='id'
							dataFormat={(cell, row) => {
								return (
									<div>
										<LinkContainer
											exact
											to={`/user/${userId}/certificate/${row.id}/edit`}>
											<OverlayTrigger
												placement='top'
												overlay={<Tooltip id='tooltip'>Edit</Tooltip>}>
												<span className='text-success pointer'>
													{' '}
													<i className='fas fa-edit' />
												</span>
											</OverlayTrigger>
										</LinkContainer>
										<span> </span>

										<LinkContainer to={`/`} onClick={() => this.delete(row.id)}>
											<OverlayTrigger
												placement='top'
												overlay={<Tooltip id='tooltip'>Delete</Tooltip>}>
												<span
													className='text-danger pointer'
													onClick={() => this.delete(row.id)}>
													{' '}
													<i className='fas fa-trash-alt' />
												</span>
											</OverlayTrigger>
										</LinkContainer>
									</div>
								);
							}}>
							Actions
						</TableHeaderColumn>
					</BootstrapTable>
				)}
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actions, dispatch),
});

export default connect(undefined, mapDispatchToProps)(Certificates);
