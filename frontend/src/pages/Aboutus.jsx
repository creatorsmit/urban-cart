import React from 'react';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import logo from "../../../public/images/img1.png"

const Aboutus = () => {
  const values = [
    { id: 1, text: 'Customer Satisfaction' },
    { id: 2, text: 'Quality Assurance' },
    { id: 3, text: 'Affordable Pricing' },
    { id: 4, text: 'Sustainable Practices' },
  ];

  return (
    <Container className="my-5">
      <h1 className="text-center  mb-5"  style={{ fontSize: '3.5rem' }}>About Us</h1>
      <Row>
        <Col md={6} className="mb-4">
          <p>
            Welcome to Urban Cart, your one-stop destination for all things trendy and affordable! 
            Established in 2024, we've been on a mission to revolutionize online shopping by 
            offering quality products at prices that won't break the bank.
          </p>
          <p>
            Our team of dedicated professionals scours the globe to bring you the latest in fashion, 
            electronics, home decor, and more. We believe that everyone deserves access to great products, 
            and we're committed to making that a reality.
          </p>
          <h2 className="mt-4"  style={{ fontSize: '2.5rem' }}>Our Values</h2>
          <ListGroup variant="flush">
            {values.map((value) => (
              <ListGroup.Item key={value.id} className="border-0 ps-0">
                <i className="bi bi-check-circle-fill text-success me-2"></i>
                {value.text}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <p className="mt-4">
            Thank you for choosing Urban Cart. We're more than just an e-commerce platform; 
            we're your partner in finding the perfect items to enhance your lifestyle. 
            Happy shopping!
          </p>
        </Col>
        <Col md={5} >
        <Image 
  src={logo}
  alt="Urban Cart Store" 
  fluid 
  rounded 
  className="shadow"
/>
        </Col>
      </Row>
    </Container>
  );
};

export default Aboutus;