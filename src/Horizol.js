import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import MicsListItem from './components/MicsListItem';
 
const Horizol = ({mics, selected, selectedMic, handleSelect}) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Adjust this breakpoint as needed
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480, // Adjust this breakpoint as needed
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

       const cards = mics.map(mic => <MicsListItem key={mic.id} mic={mic} selectedId={selected} handleSelect={handleSelect}/ >);
  return (
    <Container>
          <Row>
              <Col><h3>Open Mic Venues</h3></Col>
          </Row>
          <Row>
              <Col>
                  <Slider {...settings}>{cards}</Slider>
              </Col>
          </Row>
    </Container>
  );
}





export default Horizol;
