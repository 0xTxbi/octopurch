import React from 'react';

import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
	return (

		<header>
			<Container>
				<Row>
					<Col className="text-center py-3">
						&copy; Octo Purch {date}
					</Col>
				</Row>
			</Container>
		</header>

	)
}

const date = new Date().getFullYear();

export default Footer;
