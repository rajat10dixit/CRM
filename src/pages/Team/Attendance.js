import React from 'react';
import { Table, Badge } from 'react-bootstrap';

const attendanceData = [
  { name: 'Rajat Dixit', date: '2025-05-23', status: 'Present' },
  { name: 'Anjali Sharma', date: '2025-05-23', status: 'Absent' },
  { name: 'Vikram Singh', date: '2025-05-23', status: 'Present' }
];

const Attendance = () => {
  return (
    <div className="container mt-4">
      <h3>Team Attendance</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              <td>{entry.date}</td>
              <td>
                <Badge bg={entry.status === 'Present' ? 'success' : 'danger'}>
                  {entry.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Attendance;
