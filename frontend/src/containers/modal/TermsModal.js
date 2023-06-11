import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TermsModal = ({ show, onClose }) => {
	return (
		<Modal show={show} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>Terms and Conditions</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>
					These terms and conditions outline the rules and regulations for the
					use of our website. By accessing this website, we assume you accept
					these terms and conditions in full. Do not continue to use our website
					if you do not agree with all the terms and conditions stated on this
					page.
				</p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onClose}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default TermsModal;
