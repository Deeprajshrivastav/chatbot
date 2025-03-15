import React, { useRef, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Card,
  CardBody,
} from "reactstrap";
import "./CSS/brodcast.css";

const BroadcastMessage = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedExtensions = ["csv", "xlsx"];
    const fileExtension = selectedFile?.name.split(".").pop().toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
      setFile(selectedFile);
      alert(`File accepted: ${selectedFile.name}`);
    } else {
      alert("Invalid file type. Please select a .csv or .xlsx file.");
    }
  };

  const handleAddFromExcelClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="p-4">
      <Card className="card-styl  mt-5">
        <CardBody>
          
          <Row className="mb-4">
            <Col>
              <h5 className="font">Broadcast Message</h5>
              <FormGroup>
                <Input
                  type="textarea"
                  placeholder="Type your message..."
                  rows={4}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
            <h5 className="font">Recipients</h5>
            <FormGroup>
              <Label className="font-label">Select from Saved contacts</Label>
              <Input type="select">
                <option>Select Contacts</option>
              </Input>
            </FormGroup>
            </Col>
          </Row>
           
          <Row className="mb-4">
            <Col>
              {file && <p className="font mt-2">Selected File: {file.name}</p>}
              <div className="d-flex align-items-center gap-2">
                <Button className="btn-color" onClick={handleAddFromExcelClick}>
                  + Add from Excel
                </Button>
                <Input
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleFileChange}
                  innerRef={fileInputRef}
                  style={{ display: "none" }}
                />
              </div>
            </Col>
          </Row>

          
          <Row>
            <Col>
              <h6 className="font">Filters</h6>
              <FormGroup>
                <Label className="font-label">Excluding</Label>
                <Input type="select">
                  <option>Select Contact</option>
                </Input>
              </FormGroup>
              
            </Col>
          </Row>
          <Row>
          <div className="d-flex mt-3">
                <Button color="secondary" className="me-2">
                  Reset
                </Button>
                 
                <Button className="submit-btns  mx-4">Publish</Button>
              </div>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default BroadcastMessage;
