import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const TravelRecommendations = () => {
  return (
    <Container>
      <h1>Travel Recommendations</h1>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/350x150" />
            <Card.Body>
              <Card.Title>Destination 1</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                eget est sed mauris aliquam gravida sed quis justo.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/350x150" />
            <Card.Body>
              <Card.Title>Destination 2</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                eget est sed mauris aliquam gravida sed quis justo.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://via.placeholder.com/350x150" />
            <Card.Body>
              <Card.Title>Destination 3</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                eget est sed mauris aliquam gravida sed quis justo.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TravelRecommendations;
