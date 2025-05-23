import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import { 
  Card, 
  Table, 
  Button, 
  Form, 
  InputGroup, 
  Badge,
  Dropdown,
  Pagination
} from 'react-bootstrap';
import { 
  FaSearch, 
  FaFilter, 
  FaPlus,
  FaChartLine
} from 'react-icons/fa';

const CampaignList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const campaigns = [
    { id: 1, name: 'Summer Sale', status: 'Active', startDate: '2023-06-01', endDate: '2023-08-31', budget: 5000 },
    { id: 2, name: 'New Product Launch', status: 'Planning', startDate: '2023-09-01', endDate: '2023-09-30', budget: 3000 },
    { id: 3, name: 'Holiday Special', status: 'Completed', startDate: '2022-12-01', endDate: '2022-12-31', budget: 7000 }
  ];

  const statusOptions = ['All', 'Planning', 'Active', 'Completed', 'Paused'];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const paginatedCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusVariant = (status) => {
    switch(status) {
      case 'Active': return 'success';
      case 'Planning': return 'warning';
      case 'Completed': return 'secondary';
      case 'Paused': return 'danger';
      default: return 'primary';
    }
  };

  return (
    <div className="campaign-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Campaigns</h2>
        <Button variant="primary">
          <FaPlus className="me-2" />
          New Campaign
        </Button>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statusOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Form.Select>
            </Col>
            <Col md={3}>
              <Button variant="outline-secondary" className="w-100">
                <FaFilter className="me-2" />
                More Filters
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <div className="table-responsive">
            <Table striped hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Dates</th>
                  <th>Budget</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCampaigns.map(campaign => (
                  <tr key={campaign.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="campaign-icon me-2">
                          <FaChartLine />
                        </div>
                        <div>
                          <strong>{campaign.name}</strong>
                          <div className="text-muted small">ID: {campaign.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Badge bg={getStatusVariant(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </td>
                    <td>
                      {campaign.startDate} to {campaign.endDate}
                    </td>
                    <td>
                      ${campaign.budget.toLocaleString()}
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="link" id="dropdown-actions">
                          Actions
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>View</Dropdown.Item>
                          <Dropdown.Item>Edit</Dropdown.Item>
                          <Dropdown.Item>Duplicate</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item className="text-danger">
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-4">
              <p>No campaigns found matching your criteria</p>
              <Button variant="outline-primary" onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
              }}>
                Clear Filters
              </Button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <Pagination>
                <Pagination.Prev 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                />
                {Array.from({ length: totalPages }, (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                />
              </Pagination>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CampaignList;