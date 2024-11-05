import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const ArtistHeader = ({artistName}) => {
	return <Row className="bg-primary text-center" style={{color: "white"}}>
					<Col>
						<h2>{artistName}</h2>
					</Col>
			</Row>;
}

export default ArtistHeader;