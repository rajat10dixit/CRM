import React, { useState } from 'react';
import { Card, Form, Button, Table, Alert } from 'react-bootstrap';
import { FaFileUpload, FaCheck, FaTimes } from 'react-icons/fa';
import Papa from 'papaparse';

const LeadImport = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [mapping, setMapping] = useState({});
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState([]);

  const requiredFields = ['first_name', 'email', 'phone'];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    Papa.parse(selectedFile, {
      header: true,
      complete: (results) => {
        setPreviewData(results.data.slice(0, 5));
        setStep(2);
      }
    });
  };

  const handleMappingChange = (csvField, dbField) => {
    setMapping({
      ...mapping,
      [csvField]: dbField
    });
  };

  const validateImport = () => {
    const missingFields = requiredFields.filter(field => 
      !Object.values(mapping).includes(field)
    );
    
    if (missingFields.length > 0) {
      setErrors([`Missing required fields: ${missingFields.join(', ')}`]);
      return false;
    }

    setErrors([]);
    return true;
  };

  const handleImport = () => {
    if (!validateImport()) return;
    
    // Simulate import
    console.log('Importing leads with mapping:', mapping);
    setStep(3);
  };

  const dbFields = [
    { id: 'first_name', name: 'First Name', required: true },
    { id: 'last_name', name: 'Last Name', required: false },
    { id: 'email', name: 'Email', required: true },
    { id: 'phone', name: 'Phone', required: true },
    { id: 'company', name: 'Company', required: false },
    { id: 'source', name: 'Source', required: false }
  ];

  return (
    <div className="lead-import">
      <h2 className="mb-4">Import Leads</h2>
      
      <Card>
        <Card.Body>
          {step === 1 && (
            <div className="text-center p-5">
              <Form.Group className="mb-3">
                <Form.Label>Select CSV File</Form.Label>
                <Form.Control 
                  type="file" 
                  accept=".csv" 
                  onChange={handleFileChange}
                />
              </Form.Group>
              <p className="text-muted">CSV should contain at least: First Name, Email, Phone</p>
            </div>
          )}

          {step === 2 && previewData.length > 0 && (
            <>
              <h5 className="mb-3">Map CSV Fields to CRM Fields</h5>
              
              {errors.length > 0 && (
                <Alert variant="danger">
                  {errors.map((error, i) => (
                    <div key={i}>{error}</div>
                  ))}
                </Alert>
              )}

              <Table striped bordered responsive>
                <thead>
                  <tr>
                    <th>CSV Field</th>
                    <th>CRM Field</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(previewData[0]).map(csvField => (
                    <tr key={csvField}>
                      <td>{csvField}</td>
                      <td>
                        <Form.Select
                          value={mapping[csvField] || ''}
                          onChange={(e) => handleMappingChange(csvField, e.target.value)}
                        >
                          <option value="">-- Select Field --</option>
                          {dbFields.map(field => (
                            <option 
                              key={field.id} 
                              value={field.id}
                              disabled={field.required && Object.values(mapping).includes(field.id)}
                            >
                              {field.name} {field.required && '*'}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="mt-4">
                <h5>Preview Data</h5>
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        {Object.keys(previewData[0]).map(key => (
                          <th key={key}>{mapping[key] || key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.map((row, i) => (
                        <tr key={i}>
                          {Object.values(row).map((value, j) => (
                            <td key={j}>{value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>

              <div className="d-flex justify-content-end mt-3">
                <Button variant="primary" onClick={handleImport}>
                  <FaFileUpload className="me-2" />
                  Import Leads
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="text-center p-5">
              <div className="mb-4">
                <FaCheck size={48} className="text-success" />
              </div>
              <h4>Import Successful!</h4>
              <p className="text-muted">25 leads were imported to the system</p>
              <Button 
                variant="outline-primary" 
                onClick={() => {
                  setStep(1);
                  setFile(null);
                  setPreviewData([]);
                  setMapping({});
                }}
              >
                Import More Leads
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default LeadImport;