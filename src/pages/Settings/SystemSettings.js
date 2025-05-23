import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    companyName: 'Acme Inc',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    allowRegistrations: true,
    maintenanceMode: false
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save to API here
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="system-settings">
      <h2 className="mb-4">System Settings</h2>
      
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Settings saved successfully!
        </Alert>
      )}

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                name="companyName"
                value={settings.companyName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Timezone</Form.Label>
              <Form.Select
                name="timezone"
                value={settings.timezone}
                onChange={handleChange}
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time (EST)</option>
                <option value="PST">Pacific Time (PST)</option>
                <option value="CET">Central European Time (CET)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date Format</Form.Label>
              <Form.Select
                name="dateFormat"
                value={settings.dateFormat}
                onChange={handleChange}
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="allow-registrations"
                label="Allow User Registrations"
                name="allowRegistrations"
                checked={settings.allowRegistrations}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Check
                type="switch"
                id="maintenance-mode"
                label="Maintenance Mode"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Settings
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SystemSettings;