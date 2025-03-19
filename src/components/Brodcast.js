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
import Modal from 'reactstrap/lib/Modal';

const BroadcastMessage = () => {
  const [file, setFile] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [excludedContacts, setExcludedContacts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [viewContactsOpen, setViewContactsOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    if (contacts.length > 0) {
      setExcludedContacts([...contacts]);
    }
  }, [contacts]);

  useEffect(() => {
    let timer;
    if (isPopupOpen) {
      timer = setTimeout(() => {
        setIsPopupOpen(false);
        setSessionId(null);
      }, 60000);  
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPopupOpen]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    const allowedExtensions = ["csv", "xlsx"];
    const fileExtension = selectedFile?.name.split(".").pop().toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
      setFile(selectedFile);
      
      const formData = new FormData();
      formData.append("upload", selectedFile);

      try {
        const response = await axios.post("https://065f-2409-40c2-1168-ff6f-8899-f782-c664-1db9.ngrok-free.app/extract_csv", formData, {
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
      const response = await axios.post("https://065f-2409-40c2-1168-ff6f-8899-f782-c664-1db9.ngrok-free.app/broadcast", payload);
      console.log("Broadcast successful:", response.data);
      alert("Message sent successfully!");
      setSessionId(response.data.sessionid);
      setIsPopupOpen(true);
      setMessage("");
      setExcludedContacts([]);
      setFile(null);
      setContacts([]);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message. Please try again.");
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleReset = () => {
    setMessage("");
    setExcludedContacts([]);
    setFile(null);
    setContacts([]);
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
              <Button color="secondary" className="me-2" onClick={handleReset}>
                Reset
              </Button>
              <Button className="submit-btns mx-4" onClick={handlePublish}>Publish</Button>
            </div>
          </Row>
        </CardBody>
      </Card>

      <Modal isOpen={isPopupOpen} toggle={togglePopup} className="popup-modal">
        <div className="modal-header">
          <h5 className="modal-title">Success</h5>
          <button type="button" className="close" onClick={togglePopup}>
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <iframe 
            src={`https://065f-2409-40c2-1168-ff6f-8899-f782-c664-1db9.ngrok-free.app${sessionId ? `?sessionId=${sessionId}` : ''}`}
            style={{ width: '100%', height: '400px', border: 'none' }} 
            title="Google"
          />
        </div>
      </Modal>
    </div>
  );
};

export default BroadcastMessage;