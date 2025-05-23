import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { 
  FaUsers, 
  FaChartLine, 
  FaCalendarAlt, 
  FaEnvelope 
} from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const MainDashboard = () => {
  
  const stats = [
    { title: 'Total Leads', value: 245, icon: <FaUsers size={24} />, color: 'light' },   // changed to light
    { title: 'Conversion Rate', value: '32%', icon: <FaChartLine size={24} />, color: 'light' },
    { title: 'Active Campaigns', value: 8, icon: <FaCalendarAlt size={24} />, color: 'light' },
    { title: 'Unread Messages', value: 12, icon: <FaEnvelope size={24} />, color: 'light' }
  ];

  const leadData = [
    { name: 'Jan', leads: 40 },
    { name: 'Feb', leads: 65 },
    { name: 'Mar', leads: 50 },
    { name: 'Apr', leads: 75 },
    { name: 'May', leads: 90 },
    { name: 'Jun', leads: 110 }
  ];

  const recentActivities = [
    { id: 1, action: 'New lead added', time: '2 mins ago', user: 'John Doe' },
    { id: 2, action: 'Campaign started', time: '1 hour ago', user: 'Jane Smith' },
    { id: 3, action: 'Task completed', time: '3 hours ago', user: 'Mike Johnson' }
  ];

  return (
    <div className="dashboard">
  <h2 className="mb-4">Dashboard Overview</h2>
  
  <Row className="mb-4">
    {stats.map((stat, index) => (
      <Col key={index} md={3}>
        <Card className="stat-card text-dark">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="stat-title">{stat.title}</h6>
                <h3 className="stat-value">{stat.value}</h3>
              </div>
              <div className="stat-icon" style={{ color: '#0D6EFD' /* dark purple */ }}>
                {stat.icon}
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>

  <Row className="mb-4">
    <Col md={8}>
      <Card className="h-100 text-dark">
        <Card.Body>
          <Card.Title>Leads Overview</Card.Title>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="leads" fill="#0D6EFD" />  {/* dark purple bar */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card.Body>
      </Card>
    </Col>
    <Col md={4}>
      <Card className="h-100 text-dark">
        <Card.Body>
          <Card.Title>Recent Activities</Card.Title>
          <div className="activity-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-content">
                  <strong>{activity.user}</strong> {activity.action}
                </div>
                <div className="activity-time">{activity.time}</div>
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

export default MainDashboard;
