import React, { useRef, useState, useEffect } from "react";
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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import axios from "axios";
import "./CSS/brodcast.css";
import CloseIcon from '@mui/icons-material/Close';

const BroadcastMessage = () => {
  const [file, setFile] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [excludedContacts, setExcludedContacts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [viewContactsOpen, setViewContactsOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");

  // When contacts are loaded, set all to be excluded by default
  useEffect(() => {
    if (contacts.length > 0) {
      setExcludedContacts([...contacts]);
    }
  }, [contacts]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    const allowedExtensions = ["csv", "xlsx"];
    const fileExtension = selectedFile?.name.split(".").pop().toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
      setFile(selectedFile);
      
      const formData = new FormData();
      formData.append("upload", selectedFile);

      try {
        const response = await axios.post("https://5d47-2409-40c2-116c-1c96-7571-230a-e579-a1da.ngrok-free.app/extract_csv", formData, {
          headers: {
            "Content-Type":"multipart/form-data",
          },
        });
        console.log("File uploaded successfully:", response.data);
        setContacts(response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file. Please try again.");
      }
    } else {
      alert("Invalid file type. Please select a .csv or .xlsx file.");
    }
  };

  const handleAddFromExcelClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveFile = () => {
    setFile(null);
    setContacts([]);
    setExcludedContacts([]);
  };

  const handleExcludeToggle = (contact, e) => {
    // Prevent dropdown from closing when clicking checkboxes
    if (e) e.stopPropagation();
    
    if (excludedContacts.includes(contact)) {
      setExcludedContacts(excludedContacts.filter(c => c !== contact));
    } else {
      setExcludedContacts([...excludedContacts, contact]);
    }
  };

  const handleSelectAllExclusions = (e) => {
    e.stopPropagation();
    setExcludedContacts([...contacts]);
  };

  const handleClearAllExclusions = (e) => {
    e.stopPropagation();
    setExcludedContacts([]);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleViewContacts = () => {
    setViewContactsOpen(!viewContactsOpen);
  };

  // Get display text for dropdown toggle
  const getDropdownText = () => {
    if (contacts.length === 0) return "No contacts available";
    if (excludedContacts.length === contacts.length) return "All contacts selected";
    if (excludedContacts.length === 0) return "No contacts selected";
    return `${excludedContacts.length} of ${contacts.length} selected`;
  };

  const handlePublish = async () => {
    const selectedContacts = excludedContacts;
    const payload = {
      message,
      contacts: selectedContacts,
    };

    try {
      const response = await axios.post("https://5d47-2409-40c2-116c-1c96-7571-230a-e579-a1da.ngrok-free.app/broadcast", payload);
      console.log("Broadcast successful:", response.data);
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <Card className="card-styl mt-5">
        <CardBody>
          
          <Row className="mb-4">
            <Col>
              <h5 className="font">Broadcast Message</h5>
              <FormGroup>
                <Input
                  type="textarea"
                  placeholder="Type your message..."
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5 className="font">Recipients</h5>
              <FormGroup>
                <Label className="font-label">View Contacts</Label>
                <Dropdown isOpen={viewContactsOpen} toggle={toggleViewContacts} className="w-100">
                  <DropdownToggle caret className="w-100 d-flex justify-content-between align-items-center" color="light">
                    <span>{contacts.length > 0 ? `${contacts.length} contacts loaded` : "No contacts available"}</span>
                  </DropdownToggle>
                  <DropdownMenu className="w-100" style={{ maxHeight: "250px", overflowY: "auto" }}>
                    {contacts.length > 0 ? (
                      <>
                        <div className="px-3 py-1 d-flex justify-content-between border-bottom">
                          <small>{contacts.length} contacts loaded</small>
                        </div>
                        {contacts.map((contact, index) => (
                          <DropdownItem key={index} toggle={false} className="px-3 py-2" disabled>
                            {contact}
                          </DropdownItem>
                        ))}
                      </>
                    ) : (
                      <DropdownItem disabled>No contacts available. Upload a file first.</DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
              </FormGroup>
            </Col>
          </Row>
           
          <Row className="mb-4">
            <Col>
              {file && (
                <p className="font mt-2">
                  Selected File: {file.name}
                  <CloseIcon onClick={handleRemoveFile} style={{ cursor: "pointer", marginLeft: "10px", color: "red" }} />
                </p>
              )}
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
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="w-100">
                  <DropdownToggle caret className="w-100 d-flex justify-content-between align-items-center" color="light">
                    <span>{getDropdownText()}</span>
                  </DropdownToggle>
                  <DropdownMenu className="w-100" style={{ maxHeight: "250px", overflowY: "auto" }}>
                    {contacts.length > 0 ? (
                      <>
                        <div className="px-3 py-1 d-flex justify-content-between border-bottom">
                          <small>{excludedContacts.length} of {contacts.length} selected</small>
                          <div>
                            <Button color="link" size="sm" className="p-0 me-2" onClick={handleSelectAllExclusions}>Select All</Button>
                            <Button color="link" size="sm" className="p-0" onClick={handleClearAllExclusions}>Clear</Button>
                          </div>
                        </div>
                        {contacts.map((contact, index) => (
                          <DropdownItem key={index} toggle={false} className="px-3 py-2" onClick={(e) => e.preventDefault()}>
                            <div className="form-check mb-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`exclude-${index}`}
                                checked={excludedContacts.includes(contact)}
                                onChange={(e) => handleExcludeToggle(contact, e)}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <label 
                                className="form-check-label w-100" 
                                htmlFor={`exclude-${index}`}
                                onClick={(e) => handleExcludeToggle(contact, e)}
                              >
                                {contact}
                              </label>
                            </div>
                          </DropdownItem>
                        ))}
                      </>
                    ) : (
                      <DropdownItem disabled>No contacts available. Upload a file first.</DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <div className="d-flex mt-3">
              <Button color="secondary" className="me-2">
                Reset
              </Button>
              <Button className="submit-btns mx-4" onClick={handlePublish}>Publish</Button>
            </div>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default BroadcastMessage;