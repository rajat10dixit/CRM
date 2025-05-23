import React from 'react';
import { Card, Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const TaskDetail = () => {
  // Example task detail (can be passed via props or URL params)
  const task = {
    id: 't1',
    title: 'Follow up with lead',
    description: 'Contact the client via email and follow up regarding the CRM demo.',
    createdBy: 'Rajat Dixit',
    assignedTo: 'Sales Team',
    dueDate: '2025-05-28',
    status: 'To Do',
    priority: 'high'
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={12}>
          <Button variant="light" className="mb-3">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Board
          </Button>
          <Card>
            <Card.Header>
              <h4>{task.title}</h4>
              <Badge bg={getPriorityColor(task.priority)} className="ms-2 text-uppercase">
                {task.priority}
              </Badge>
            </Card.Header>
            <Card.Body>
              <Card.Text><strong>Description:</strong> {task.description}</Card.Text>
              <Card.Text><strong>Created By:</strong> {task.createdBy}</Card.Text>
              <Card.Text><strong>Assigned To:</strong> {task.assignedTo}</Card.Text>
              <Card.Text><strong>Due Date:</strong> {task.dueDate}</Card.Text>
              <Card.Text>
                <strong>Status:</strong> 
                <Badge bg="secondary" className="ms-2">{task.status}</Badge>
              </Card.Text>
              <div className="mt-3">
                <Button variant="primary" className="me-2">
                  <FontAwesomeIcon icon={faEdit} /> Edit Task
                </Button>
                <Button variant="danger">
                  <FontAwesomeIcon icon={faTrashAlt} /> Delete Task
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskDetail;
