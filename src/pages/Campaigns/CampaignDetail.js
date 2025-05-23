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
  ProgressBar,
  Form
} from 'react-bootstrap';
import {
  FaChartLine,
  FaUsers,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaEdit,
  FaCog
} from 'react-icons/fa';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const CampaignDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [editing, setEditing] = useState(false);

  const campaign = {
    id,
    name: 'Summer Sale 2023',
    status: 'Active',
    startDate: '2023-06-01',
    endDate: '2023-08-31',
    budget: 5000,
    spent: 2750,
    description: 'Annual summer promotion with discounts on all products',
    targetAudience: 'Existing customers and new leads aged 25-45',
    channels: ['Email', 'Social Media', 'PPC'],
    goal: 'Increase sales by 20% during summer months'
  };

  const leadData = [
    { name: 'Week 1', leads: 40, conversions: 12 },
    { name: 'Week 2', leads: 65, conversions: 20 },
    { name: 'Week 3', leads: 50, conversions: 18 },
    { name: 'Week 4', leads: 75, conversions: 25 }
  ];

  const [formData, setFormData] = useState(campaign);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    console.log('Saved campaign:', formData);
    setEditing(false);
  };

  const getProgress = () => {
    const start = new Date(campaign.startDate);
    const end = new Date(campaign.endDate);
    const today = new Date();
    const totalDays = (end - start) / (1000 * 60 * 60 * 24);
    const daysPassed = (today - start) / (1000 * 60 * 60 * 24);
    return Math.min(100, Math.max(0, (daysPassed / totalDays) * 100));
  };

  return (
    <div className="campaign-detail p-4">
      <h3>{formData.name}</h3>
      <Badge bg={formData.status === 'Active' ? 'success' : 'secondary'}>{formData.status}</Badge>
      <p className="text-muted">ID: {id}</p>

      <ProgressBar now={getProgress()} label={`${Math.round(getProgress())}% Duration`} className="my-3" />

      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="overview"><FaChartLine /> Overview</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="performance"><FaMoneyBillWave /> Performance</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="leads"><FaUsers /> Leads</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="settings"><FaCog /> Settings</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          {/* Overview Tab */}
          <Tab.Pane eventKey="overview">
            <Card>
              <Card.Body>
                {!editing ? (
                  <>
                    <p><strong>Description:</strong> {formData.description}</p>
                    <p><strong>Target Audience:</strong> {formData.targetAudience}</p>
                    <p><strong>Channels:</strong> {formData.channels.join(', ')}</p>
                    <p><strong>Goal:</strong> {formData.goal}</p>
                    <p><strong>Budget:</strong> ${formData.budget}</p>
                    <p><strong>Spent:</strong> ${formData.spent}</p>
                    <p><strong>Start:</strong> {formData.startDate}</p>
                    <p><strong>End:</strong> {formData.endDate}</p>
                    <Button variant="outline-primary" onClick={() => setEditing(true)}><FaEdit /> Edit</Button>
                  </>
                ) : (
                  <>
                    <Form>
                      <Form.Group className="mb-2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" value={formData.description} onChange={handleChange} />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label>Target Audience</Form.Label>
                        <Form.Control name="targetAudience" value={formData.targetAudience} onChange={handleChange} />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label>Goal</Form.Label>
                        <Form.Control name="goal" value={formData.goal} onChange={handleChange} />
                      </Form.Group>
                      <Button variant="success" onClick={handleSave}>Save</Button>{' '}
                      <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
                    </Form>
                  </>
                )}
              </Card.Body>
            </Card>
          </Tab.Pane>

          {/* Performance Tab */}
          <Tab.Pane eventKey="performance">
            <Card>
              <Card.Body>
                <h5>Lead & Conversion Trends</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={leadData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="leads" fill="#8884d8" />
                    <Bar dataKey="conversions" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Tab.Pane>

          {/* Leads Tab */}
          <Tab.Pane eventKey="leads">
            <Card>
              <Card.Body>
                <p><strong>Total Leads:</strong> 230</p>
                <p><strong>Conversions:</strong> 75</p>
                <p><strong>Conversion Rate:</strong> {(75 / 230 * 100).toFixed(2)}%</p>
              </Card.Body>
            </Card>
          </Tab.Pane>

          {/* Settings Tab */}
          <Tab.Pane eventKey="settings">
            <Card>
              <Card.Body>
                <p>More settings and integrations can be added here later.</p>
              </Card.Body>
            </Card>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default CampaignDetail;
