import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Card, 
  Tab, 
  Nav, 
  Row, 
  Col, 
  Button, 
  Badge,
  Form,
  ListGroup
} from 'react-bootstrap';
import { 
  FaPhone, 
  FaEnvelope, 
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserTag,
  FaHistory,
  FaFileAlt,
  FaTasks
} from 'react-icons/fa';

const LeadDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('details');
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([
    { id: 1, content: 'Interested in premium package', date: '2023-05-15', author: 'John Doe' },
    { id: 2, content: 'Requested callback on Monday', date: '2023-05-10', author: 'Jane Smith' }
  ]);

  // Simulated lead data
  const lead = {
    id: id,
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    status: 'Qualified',
    source: 'Website',
    address: '123 Main St, New York, NY 10001',
    createdAt: '2023-05-01',
    lastContact: '2023-05-15',
    assignedTo: 'Sarah Johnson'
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    
    setNotes([
      {
        id: notes.length + 1,
        content: note,
        date: new Date().toISOString().split('T')[0],
        author: 'Current User'
      },
      ...notes
    ]);
    setNote('');
  };

  return (
    <div className="lead-detail">
      <h2 className="mb-4">Lead Details</h2>
      
      <Row className="mb-4">
        <Col md={8}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h3>{lead.name}</h3>
                  <Badge bg="success" className="mb-2">{lead.status}</Badge>
                  <p className="text-muted">Source: {lead.source}</p>
                </div>
                <div>
                  <Button variant="outline-primary" className="me-2">Edit</Button>
                  <Button variant="outline-danger">Delete</Button>
                </div>
              </div>

              <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
                <Nav variant="tabs" className="mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="details">Details</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="history">History</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="notes">Notes</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="tasks">Tasks</Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="details">
                    <Row>
                      <Col md={6}>
                        <div className="detail-item">
                          <FaEnvelope className="detail-icon" />
                          <div>
                            <h6>Email</h6>
                            <p>{lead.email}</p>
                          </div>
                        </div>
                        <div className="detail-item">
                          <FaPhone className="detail-icon" />
                          <div>
                            <h6>Phone</h6>
                            <p>{lead.phone}</p>
                          </div>
                        </div>
                        <div className="detail-item">
                          <FaMapMarkerAlt className="detail-icon" />
                          <div>
                            <h6>Address</h6>
                            <p>{lead.address}</p>
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="detail-item">
                          <FaUserTag className="detail-icon" />
                          <div>
                            <h6>Assigned To</h6>
                            <p>{lead.assignedTo}</p>
                          </div>
                        </div>
                        <div className="detail-item">
                          <FaCalendarAlt className="detail-icon" />
                          <div>
                            <h6>Created On</h6>
                            <p>{lead.createdAt}</p>
                          </div>
                        </div>
                        <div className="detail-item">
                          <FaHistory className="detail-icon" />
                          <div>
                            <h6>Last Contact</h6>
                            <p>{lead.lastContact}</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Tab.Pane>

                  <Tab.Pane eventKey="history">
                    <div className="timeline">
                      {[1, 2, 3].map(item => (
                        <div key={item} className="timeline-item">
                          <div className="timeline-content">
                            <h6>Call with {lead.name}</h6>
                            <p className="text-muted">May {15 - item}, 2023</p>
                            <p>Discussed product features and pricing. Interested in demo.</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="notes">
                    <Form onSubmit={handleAddNote} className="mb-4">
                      <Form.Group>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Add a note..."
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit" className="mt-2">
                        Add Note
                      </Button>
                    </Form>

                    <ListGroup>
                      {notes.map(note => (
                        <ListGroup.Item key={note.id}>
                          <div className="d-flex justify-content-between">
                            <strong>{note.author}</strong>
                            <small className="text-muted">{note.date}</small>
                          </div>
                          <p className="mb-0">{note.content}</p>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Tab.Pane>

                  <Tab.Pane eventKey="tasks">
                    <div className="tasks-list">
                      {[1, 2].map(task => (
                        <div key={task} className="task-item">
                          <div className="form-check">
                            <input 
                              type="checkbox" 
                              className="form-check-input" 
                              id={`task-${task}`}
                            />
                            <label className="form-check-label" htmlFor={`task-${task}`}>
                              Follow up about demo request
                            </label>
                          </div>
                          <small className="text-muted">Due May {20 + task}, 2023</small>
                        </div>
                      ))}
                      <Button variant="outline-primary" size="sm" className="mt-2">
                        <FaTasks className="me-1" />
                        Add Task
                      </Button>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <h5>Quick Actions</h5>
              <Button variant="outline-primary" className="w-100 mb-2">
                <FaPhone className="me-2" />
                Log a Call
              </Button>
              <Button variant="outline-success" className="w-100 mb-2">
                <FaEnvelope className="me-2" />
                Send Email
              </Button>
              <Button variant="outline-info" className="w-100">
                <FaCalendarAlt className="me-2" />
                Schedule Meeting
              </Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5>Related Campaigns</h5>
              <div className="campaign-item">
                <h6>Summer Sale 2023</h6>
                <p className="text-muted">Started on May 1, 2023</p>
                <Badge bg="info">Active</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LeadDetail;