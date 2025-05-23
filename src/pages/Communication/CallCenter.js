import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Table } from 'react-bootstrap';

const CallCenter = () => {
  const [script, setScript] = useState({
    title: '',
    steps: ['']
  });

  const [scripts, setScripts] = useState([
    { 
      id: 1, 
      title: 'Customer Support', 
      steps: [
        'Greet the customer warmly',
        'Ask for their account information',
        'Listen actively to their concern',
        'Provide solution or escalate if needed'
      ] 
    },
    { 
      id: 2, 
      title: 'Sales Call', 
      steps: [
        'Introduce yourself and company',
        'Ask qualifying questions',
        'Present product benefits',
        'Handle objections',
        'Close or schedule follow-up'
      ] 
    }
  ]);

  const handleStepChange = (index, value) => {
    const newSteps = [...script.steps];
    newSteps[index] = value;
    setScript({ ...script, steps: newSteps });
  };

  const addStep = () => {
    setScript({ ...script, steps: [...script.steps, ''] });
  };

  const removeStep = (index) => {
    const newSteps = script.steps.filter((_, i) => i !== index);
    setScript({ ...script, steps: newSteps });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newScript = {
      id: scripts.length + 1,
      title: script.title,
      steps: script.steps.filter(step => step.trim() !== '')
    };
    setScripts([...scripts, newScript]);
    setScript({ title: '', steps: [''] });
  };

  const loadScript = (id) => {
    const selected = scripts.find(s => s.id === id);
    if (selected) {
      setScript({
        title: selected.title,
        steps: [...selected.steps]
      });
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <h5>Call Scripts</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Script Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {scripts.map(script => (
                    <tr key={script.id}>
                      <td>{script.title}</td>
                      <td>
                        <Button 
                          size="sm" 
                          variant="outline-primary"
                          onClick={() => loadScript(script.id)}
                        >
                          Load
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Script Title</Form.Label>
                  <Form.Control 
                    value={script.title}
                    onChange={(e) => setScript({...script, title: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Call Steps</Form.Label>
                  {script.steps.map((step, index) => (
                    <div key={index} className="d-flex mb-2">
                      <Form.Control
                        value={step}
                        onChange={(e) => handleStepChange(index, e.target.value)}
                        placeholder={`Step ${index + 1}`}
                      />
                      <Button 
                        variant="outline-danger" 
                        className="ms-2"
                        onClick={() => removeStep(index)}
                        disabled={script.steps.length <= 1}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button 
                    variant="outline-secondary" 
                    size="sm"
                    onClick={addStep}
                  >
                    Add Step
                  </Button>
                </Form.Group>

                <div className="d-flex justify-content-end gap-2">
                  <Button variant="outline-secondary">Preview</Button>
                  <Button variant="primary" type="submit">Save Script</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CallCenter;