import React, { useState, useRef } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  InputGroup,
  FormText,
} from "reactstrap";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import whatsapp from "./Image/whatsapp.png";
import axios from "axios";  

const Mybot = () => {
  const [botName, setBotName] = useState("");
  const [listItems, setListItems] = useState([
    { id: 1, title: "List 1", text: "" },
    { id: 2, title: "List 2", text: "" },
    { id: 3, title: "List 3", text: "" },
    { id: 4, title: "List 4", text: "" },
  ]);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const addListItem = () => {
    const newId = listItems.length + 1;
    setListItems([
      ...listItems,
      { id: newId, title: `List ${newId}`, text: "" },
    ]);
  };

  const removeListItem = (id) => {
    const updatedItems = listItems.filter((item) => item.id !== id);
    setListItems(updatedItems);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files.map((file) => file.name));
    setSelectedFile(e.target.files[0]);  
  };

  const handleAddMediaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async () => {
    const qa = listItems.map((item) => ({
      question: item.title,
      answer: item.text,
    }));
    const formData = new FormData();
    formData.append("bot_name", botName);
    formData.append("qa", JSON.stringify(qa));
    // if (selectedFile) {
    //   formData.append("file", selectedFile);
    // }
    const jsonData = {
      bot_name: botName,
      qa:qa
    };

    console.log("Sending data:", jsonData);

    try {
      const response = await axios.post(
        "https://755d-2409-40c2-100e-df19-7c31-81c4-912d-d495.ngrok-free.app/save_bot",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", response.data);
      alert("Bot created successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error creating bot. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <div className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="card-styl" style={{ height: "820px" }}>
              <CardBody className="d-flex flex-column">
                <div className="mb-4">
                  <h5 className="mb-3">Bot Name</h5>
                  <InputGroup className="mb-2">
                    <Input
                      className="input-field"
                      value={botName}
                      onChange={(e) => setBotName(e.target.value)}
                      placeholder="Enter bot name"
                    />
                  </InputGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <FormText color="muted">
                      {selectedFiles.length > 0
                        ? selectedFiles.join(", ")
                        : "No file chosen"}
                    </FormText>
                    <Button
                      style={{
                        background: "#E3E3E3",
                        border: "None",
                        color: "black",
                      }}
                      size="sm"
                      className="d-flex align-items-center"
                      onClick={handleAddMediaClick}
                    >
                      <span>Add Media</span>
                      <ImageIcon />
                    </Button>

                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <div
                  style={{ maxHeight: "550px", overflowY: "auto", flexGrow: 1 }}
                >
                  {listItems.map((item) => (
                    <div
                      key={item.id}
                      className="mb-3 d-flex align-items-center"
                    >
                      <div style={{ width: "100%" }}>
                        <InputGroup className="mb-2">
                          <Input
                            value={item.title}
                            onChange={(e) => {
                              const updatedItems = listItems.map((listItem) =>
                                listItem.id === item.id
                                  ? { ...listItem, title: e.target.value }
                                  : listItem
                              );
                              setListItems(updatedItems);
                            }}
                            placeholder={`List ${item.id}`}
                            className="input-field"
                          />
                        </InputGroup>
                        <InputGroup>
                          <Input
                            value={item.text}
                            onChange={(e) => {
                              const updatedItems = listItems.map((listItem) =>
                                listItem.id === item.id
                                  ? { ...listItem, text: e.target.value }
                                  : listItem
                              );
                              setListItems(updatedItems);
                            }}
                            placeholder="You can customise it to with a ton of variants!"
                            className="input-field"
                          />
                        </InputGroup>
                      </div>
                      <div
                        className="ms-2"
                        onClick={() => removeListItem(item.id)}
                      >
                        <DeleteIcon />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <Button className="btn-color" size="sm" onClick={addListItem}>
                    <span className="me-1 ">+</span>
                    Add More
                  </Button>
                  <Button className="btn-color" onClick={handleSubmit}>
                    Done
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col md={4} className="d-flex justify-content-center">
            <div className="position-relative" style={{ height: "300px" }}>
              <img
                src={whatsapp}
                alt="WhatsApp preview"
                className="img-fluid"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Mybot;
