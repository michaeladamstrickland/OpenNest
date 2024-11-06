import React from 'react';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Chatbot from '../components/Chatbot'; // Import AI chatbot

const SellerDashboard = () => {
  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h2>Welcome to Seller Tools</h2>
          <p>Here, you can list your properties, view offers, and manage your listings.</p>
        </Col>
      </Row>

      {/* Add seller-specific features here */}
      <Row className="mt-4">
        <Col>
          <h3>Your Listed Properties</h3>
          <Card className="my-3">
            <Card.Body>
              <Card.Title>123 Main St, New York</Card.Title>
              <Card.Text>
                Price: $500,000
              </Card.Text>
              <Button variant="primary" className="me-2">Edit Property</Button>
              <Button variant="danger">Remove Property</Button>
            </Card.Body>
          </Card>

          {/* You can loop through seller properties and display them */}
          <Card className="my-3">
            <Card.Body>
              <Card.Title>456 Oak St, Los Angeles</Card.Title>
              <Card.Text>
                Price: $750,000
              </Card.Text>
              <Button variant="primary" className="me-2">Edit Property</Button>
              <Button variant="danger">Remove Property</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h3>Received Offers</h3>
          <Card className="my-3">
            <Card.Body>
              <Card.Title>Offer on 123 Main St</Card.Title>
              <Card.Text>
                Buyer: buyer123@example.com
                <br />
                Offer: $480,000
              </Card.Text>
              <Button variant="success" className="me-2">Accept Offer</Button>
              <Button variant="danger">Reject Offer</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Chatbot />
        </Col>
      </Row>
    </Container>
  );
};

export default SellerDashboard;
