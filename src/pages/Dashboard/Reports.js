import React, { useState } from 'react';
import { Card, Form, Row, Col, Button, Table } from 'react-bootstrap';
import { FaFileExport } from 'react-icons/fa';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const Reports = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reportType, setReportType] = useState('campaign');

  const reportData = {
    campaign: [
      { id: 1, name: 'Summer Sale', leads: 120, conversions: 45, cost: 1200 },
      { id: 2, name: 'New Product', leads: 85, conversions: 32, cost: 800 }
    ],
    telecaller: [
      { id: 1, name: 'John Doe', calls: 56, conversions: 12 },
      { id: 2, name: 'Jane Smith', calls: 78, conversions: 18 }
    ]
  };

  const handleExport = () => {
    console.log('Exporting report:', { dateRange, reportType });
  };

  return (
    <div className="reports-page">
      <h2 className="mb-4 text-dark">Reports & Analytics</h2>
      
      <Card className="mb-4 bg-light text-dark">
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Report Type</Form.Label>
                <Form.Select 
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="text-dark"
                >
                  <option value="campaign">Campaign Performance</option>
                  <option value="telecaller">Telecaller Efficiency</option>
                  <option value="lead">Lead Source Analysis</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Date Range</Form.Label>
                <Button 
                  variant="outline-primary" 
                  className="w-100 text-start text-dark"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  {dateRange[0].startDate.toLocaleDateString()} - {dateRange[0].endDate.toLocaleDateString()}
                </Button>
                {showDatePicker && (
                  <div className="date-range-popover">
                    <DateRangePicker
                      ranges={dateRange}
                      onChange={item => setDateRange([item.selection])}
                    />
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
              <Button variant="primary" onClick={handleExport}>
                <FaFileExport className="me-2" />
                Export Report
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="bg-light text-dark">
        <Card.Body>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  {reportType === 'campaign' ? (
                    <>
                      <th>Campaign Name</th>
                      <th>Leads</th>
                      <th>Conversions</th>
                      <th>Cost</th>
                      <th>ROI</th>
                    </>
                  ) : (
                    <>
                      <th>Telecaller</th>
                      <th>Calls Made</th>
                      <th>Conversions</th>
                      <th>Conversion Rate</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {reportData[reportType]?.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.leads || item.calls}</td>
                    <td>{item.conversions}</td>
                    {reportType === 'campaign' ? (
                      <>
                        <td>${item.cost}</td>
                        <td>{Math.round((item.conversions / item.cost) * 100)}%</td>
                      </>
                    ) : (
                      <td>{Math.round((item.conversions / item.calls) * 100)}%</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Reports;
