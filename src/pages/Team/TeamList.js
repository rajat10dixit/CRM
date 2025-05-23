import React from 'react';
import { Table, Button } from 'react-bootstrap';

const teamMembers = [
  { id: 1, name: 'Rajat Dixit', role: 'Sales Manager', email: 'rajat@example.com' },
  { id: 2, name: 'Anjali Sharma', role: 'Marketing Executive', email: 'anjali@example.com' },
  { id: 3, name: 'Vikram Singh', role: 'Support Lead', email: 'vikram@example.com' }
];

const TeamList = () => {
  return (
    <div className="container mt-4">
      <h3>Team Members</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member, index) => (
            <tr key={member.id}>
              <td>{index + 1}</td>
              <td>{member.name}</td>
              <td>{member.role}</td>
              <td>{member.email}</td>
              <td><Button variant="primary" size="sm">View</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TeamList;
