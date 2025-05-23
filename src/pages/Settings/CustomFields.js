import React, { useState } from 'react';
import { Table, Button, Form, Modal, Badge } from 'react-bootstrap';

const CustomFields = () => {
  const [fields, setFields] = useState([
    { id: 1, name: 'customer_type', label: 'Customer Type', type: 'select', options: ['Retail', 'Wholesale', 'Corporate'], required: true },
    { id: 2, name: 'preferred_contact', label: 'Preferred Contact', type: 'radio', options: ['Email', 'Phone', 'SMS'], required: false },
    { id: 3, name: 'lead_score', label: 'Lead Score', type: 'number', required: false }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newField, setNewField] = useState({
    name: '',
    label: '',
    type: 'text',
    options: '',
    required: false
  });

  const fieldTypes = ['text', 'number', 'select', 'checkbox', 'radio', 'date'];

  const handleAddField = () => {
    const processedOptions = newField.options 
      ? newField.options.split(',').map(opt => opt.trim()) 
      : [];
    
    setFields([...fields, {
      id: fields.length + 1,
      name: newField.name,
      label: newField.label,
      type: newField.type,
      options: processedOptions,
      required: newField.required
    }]);
    
    setShowModal(false);
    setNewField({ name: '', label: '', type: 'text', options: '', required: false });
  };

  return (
    <div className="custom-fields">
      <div className="d-flex justify-content-between mb-4">
        <h2>Custom Fields</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add New Field
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Field Name</th>
            <th>Label</th>
            <th>Type</th>
            <th>Required</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fields.map(field => (
            <tr key={field.id}>
              <td>{field.name}</td>
              <td>{field.label}</td>
              <td>
                <Badge bg="info">{field.type}</Badge>
                {field.options && field.options.length > 0 && (
                  <span className="ms-2">
                    ({field.options.join(', ')})
                  </span>
                )}
              </td>
              <td>{field.required ? 'Yes' : 'No'}</td>
              <td>
                <Button size="sm" variant="outline-primary" className="me-2">
                  Edit
                </Button>
                <Button size="sm" variant="outline-danger">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Custom Field</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Field Name (system name)</Form.Label>
            <Form.Control 
              placeholder="e.g., customer_type"
              value={newField.name}
              onChange={(e) => setNewField({...newField, name: e.target.value})}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Display Label</Form.Label>
            <Form.Control 
              placeholder="e.g., Customer Type"
              value={newField.label}
              onChange={(e) => setNewField({...newField, label: e.target.value})}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Field Type</Form.Label>
            <Form.Select
              value={newField.type}
              onChange={(e) => setNewField({...newField, type: e.target.value})}
            >
              {fieldTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Form.Select>
          </Form.Group>

          {['select', 'radio', 'checkbox'].includes(newField.type) && (
            <Form.Group className="mb-3">
              <Form.Label>Options (comma separated)</Form.Label>
              <Form.Control 
                placeholder="e.g., Retail, Wholesale, Corporate"
                value={newField.options}
                onChange={(e) => setNewField({...newField, options: e.target.value})}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Required Field"
              checked={newField.required}
              onChange={(e) => setNewField({...newField, required: e.target.checked})}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddField}>
            Save Field
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomFields;