import { Container, Row, Col } from 'react-bootstrap';

export default function ContentGrid({ children }) {
  return(
    <Container>
      <Row>
        <Col></Col>
        <Col xs={10} md={6} lg={5}>
          {children}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
}