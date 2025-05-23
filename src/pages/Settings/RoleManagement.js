import React, { useState } from 'react';
import { Table, Button, Form, Modal, Badge } from 'react-bootstrap';

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['all'], users: 3 },
    { id: 2, name: 'Manager', permissions: ['leads', 'campaigns'], users: 5 },
    { id: 3, name: 'Agent', permissions: ['leads'], users: 12 }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newRole, setNewRole] = useState({
    name: '',
    permissions: []
  });

  const availablePermissions = [
    'dashboard', 'leads', 'contacts', 'campaigns', 
    'reports', 'settings', 'user_management'
  ];

  const togglePermission = (permission) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const handleAddRole = () => {
    setRoles([...roles, {
      id: roles.length + 1,
      name: newRole.name,
      permissions: newRole.permissions,
      users: 0
    }]);
    setShowModal(false);
    setNewRole({ name: '', permissions: [] });
  };

  return (
    <div className="role-management">
      <div className="d-flex justify-content-between mb-4">
        <h2>Role Management</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add New Role
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Users</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>
                {role.permissions.map(p => (
                  <Badge key={p} bg="info" className="me-1">{p}</Badge>
                ))}
              </td>
              <td>{role.users}</td>
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
          <Modal.Title>Add New Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Role Name</Form.Label>
            <Form.Control 
              value={newRole.name}
              onChange={(e) => setNewRole({...newRole, name: e.target.value})}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Permissions</Form.Label>
            <div className="permissions-grid">
              {availablePermissions.map(permission => (
                <Form.Check 
                  key={permission}
                  type="checkbox"
                  label={permission}
                  checked={newRole.permissions.includes(permission)}
                  onChange={() => togglePermission(permission)}
                />
              ))}
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddRole}>
            Save Role
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RoleManagement;