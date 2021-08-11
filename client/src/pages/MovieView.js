import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
//import '../css/homeview.css'

const MovieView = () => {

return (

<Container>



<Card style={{ width: '18rem', marginTop: 80 }}>
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
    <Card.Title>Movie.title</Card.Title>
    <Card.Text>
      Genres:
    </Card.Text>
    <Card.Text>
      Language:
    </Card.Text>
    <Card.Text>
      Sexuality:
    </Card.Text>
    <Card.Text>
      Release Date:
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
</Container>


)}

export default MovieView;