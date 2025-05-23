import React from 'react';
import { Card, Row, Col, ProgressBar } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CampaignDashboard = () => {
  const campaignData = [
    { name: 'Email Campaign', leads: 120, conversions: 45, cost: 1200 },
    { name: 'Social Ads', leads: 200, conversions: 80, cost: 2500 },
    { name: 'Webinar', leads: 80, conversions: 30, cost: 800 },
  ];

  return (
    <div className="campaign-dashboard">
      <h2 className="mb-4">Campaign Dashboard</h2>
      
      <Row className="mb-4">
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <h6 className="stat-title">Total Campaigns</h6>
              <h3 className="stat-value">12</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <h6 className="stat-title">Active Campaigns</h6>
              <h3 className="stat-value">5</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <h6 className="stat-title">Total Leads</h6>
              <h3 className="stat-value">1,240</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <h6 className="stat-title">Conversion Rate</h6>
              <h3 className="stat-value">32%</h3>
              <ProgressBar now={32} variant="success" className="mt-2" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Card className="h-100">
            <Card.Body>
              <h5 className="card-title">Campaign Performance</h5>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={campaignData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="leads" fill="#8884d8" name="Leads" />
                    <Bar dataKey="conversions" fill="#82ca9d" name="Conversions" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <h5 className="card-title">Recent Activities</h5>
              <div className="activity-list">
                {[1, 2, 3, 4, 5].map(item => (
                  <div key={item} className="activity-item">
                    <div className="activity-content">
                      <strong>Campaign #{item}</strong> was updated
                    </div>
                    <div className="activity-time">2 hours ago</div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CampaignDashboard;