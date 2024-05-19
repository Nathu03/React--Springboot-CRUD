import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function generateUniqueRandomNumbers(count, notEqualTo = []) {
  const uniqueNumbers = [];

  while (uniqueNumbers.length < count) {
    const randomNumber = Math.floor(Math.random() * 10);
    if (!uniqueNumbers.includes(randomNumber) && !notEqualTo.includes(randomNumber)) {
      uniqueNumbers.push(randomNumber);
    }
  }

  return uniqueNumbers;
}

function App() {
  const [data, setData] = useState({ question: '', solution: '' });
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/fetchData')
      .then(response => {
        setData(response.data);
        const uniqueNumbers = generateUniqueRandomNumbers(3, [response.data.solution]);
        setRandomNumbers([response.data.solution, ...uniqueNumbers]);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleButtonClick = (number) => {
    setSelectedNumber(number);
  };

  return (
    <Container className="App">
      <h1>React with Spring Boot</h1>
      <Row>
        <Col>
          <img src={data.question} className="img-fluid" alt="Question" />
        </Col>
      </Row>
      <Row>
        <Col>
          {randomNumbers.map((number, index) => (
            <Button
              key={index}
              variant={selectedNumber === number ? 'success' : 'primary'}
              onClick={() => handleButtonClick(number)}
              disabled={selectedNumber !== null}
            >
              {number}
            </Button>
          ))}
        </Col>
      </Row>
      {selectedNumber === data.solution && (
        <Row>
          <Col>
            <p className="text-success">Congratulations! You Win!</p>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;
