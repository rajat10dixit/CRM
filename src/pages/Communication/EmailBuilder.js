import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EmailBuilder = () => {
  const [template, setTemplate] = useState({
    name: '',
    subject: '',
    content: ''
  });

  const handleEditorChange = (event, editor) => {
    setTemplate({
      ...template,
      content: editor.getData()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Template saved:', template);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <h5>Saved Templates</h5>
              <div className="template-list">
                {['Welcome Email', 'Follow-up', 'Promotion'].map((name, i) => (
                  <div key={i} className="template-item">
                    {name}
                    <Button size="sm" variant="outline-primary" className="ms-2">
                      Load
                    </Button>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Template Name</Form.Label>
                  <Form.Control 
                    value={template.name}
                    onChange={(e) => setTemplate({...template, name: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control 
                    value={template.subject}
                    onChange={(e) => setTemplate({...template, subject: e.target.value})}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Content</Form.Label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={template.content}
                    onChange={handleEditorChange}
                  />
                </Form.Group>

                <div className="d-flex justify-content-end gap-2">
                  <Button variant="outline-secondary">Preview</Button>
                  <Button variant="primary" type="submit">Save Template</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmailBuilder;