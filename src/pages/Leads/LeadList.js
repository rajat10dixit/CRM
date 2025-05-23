import React from 'react';
import { Table, Button, Card } from 'react-bootstrap';

const LeadList = () => {
  const leads = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'New' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Contacted' }
  ];

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between mb-4">
          <h4 className="text-dark">Leads Management</h4>
          <Button variant="primary">Add Lead</Button>
        </div>
        
        <Table striped bordered hover responsive className="bg-white">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>
                  <span className={`badge ${
                    lead.status === 'New' ? 'bg-primary' : 
                    lead.status === 'Contacted' ? 'bg-success' : 'bg-secondary'
                  }`}>
                    {lead.status}
                  </span>
                </td>
                <td>
                  <Button variant="outline-primary" size="sm">View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default LeadList;