import React, { useState } from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';

const FAQs = () => {
  const [activeKey, setActiveKey] = useState(null);

  const faqs = [
    {
      question: "What is Urban Cart?",
      answer: "Urban Cart is your one-stop destination for all things trendy and affordable, offering a wide range of products including fashion, electronics, and home decor."
    },
    {
      question: "How do I place an order?",
      answer: "To place an order, simply browse our products, add them to your cart, and proceed to checkout. You will be guided through the payment process."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit cards, debit cards, and PayPal."
    },
    {
      question: "Can I return my order?",
      answer: "Yes, you can return your order within 30 days of receipt. Please refer to our return policy for more details."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can contact our customer support team via the 'Contact Us' page or by emailing support@urbancart.com."
    },
  ];

  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Frequently Asked Questions</h1>
      <Row>
        <Col md={8} className="mx-auto">
          <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
            {faqs.map((faq, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>{faq.question}</Accordion.Header>
                <Accordion.Body>
                  {faq.answer}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default FAQs;