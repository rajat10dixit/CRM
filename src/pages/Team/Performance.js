import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';

const performanceData = [
  { name: 'Rajat Dixit', target: 100, achieved: 85 },
  { name: 'Anjali Sharma', target: 100, achieved: 70 },
  { name: 'Vikram Singh', target: 100, achieved: 95 }
];

const Performance = () => {
  return (
    <div className="container mt-4">
      <h3>Team Performance</h3>
      {performanceData.map((member, index) => {
        const percentage = (member.achieved / member.target) * 100;
        return (
          <Card key={index} className="mb-3">
            <Card.Body>
              <Card.Title>{member.name}</Card.Title>
              <Card.Text>Performance: {member.achieved}/{member.target}</Card.Text>
              <ProgressBar now={percentage} label={`${Math.round(percentage)}%`} />
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default Performance;
