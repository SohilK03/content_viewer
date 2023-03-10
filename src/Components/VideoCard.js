import {
  Button,
  Modal,
  DropdownButton,
  Dropdown,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { Card } from "react-bootstrap";
import React, { useState } from "react";
import { connect } from "react-redux";
import { deleteCard, editCard } from "../redux/Actions/CardActions";
import { addHistory } from "../redux/Actions/HistoryActions";
const VideoCard = (props) => {
  const [show, setShow] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [selectedText, setText] = useState(props.category);
  const [disable, setDisable] = useState(true);
  const [isEdit, setEdit] = useState(false);
  const [form_data, setData] = useState({
    name: props.title,
    data: props.video,
  });
  const handleSelect = (e) => {
    e.preventDefault();
    if (e.target.text === "Other (User Specefic)") {
      setDisable(false);
      setText("");
    } else {
      setDisable(true);
      setText(e.target.text);
    }
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleFormChange = (e) => {
    setData({ ...form_data, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    setShow(false);
    const final_data = {
      card_id: props.id,
      time_watched: currentTime,
      date: new Date().toLocaleString() + "",
    };
    props.addHistory(final_data);
  };
  const handleShow = () => setShow(true);
  const handleDelete = (e) => {
    props.deleteCard(props.id);
  };
  const handleEdit = (e) => {
    setEdit(!isEdit);
  };
  const timeUpdate = (event) => {
    const minutes = Math.floor(event.target.currentTime / 60);
    const seconds = Math.floor(event.target.currentTime - minutes * 60);
    const currentTime =
      str_pad_left(minutes, "0", 2) + ":" + str_pad_left(seconds, "0", 2);
    setCurrentTime(currentTime);
  };
  const str_pad_left = (string, pad, length) => {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const final_data = { ...form_data, category: selectedText };
    props.editCard(
      props.id,
      final_data,
      selectedText,
      props.categories.category_array
    );
    setData({ name: "", data: "" });
    setDisable(true);
    setText("Choose Category");
  };
  return (
    <React.Fragment>
      <Card
        style={{
          height: "auto",
          width: "20rem",
        }}
        className="m-2"
      >
        <Card.Body className="d-flex flex-column justify-content-evenly">
          <Card.Title>
            <input
              type="text"
              value={form_data.name}
              name="name"
              className="w-100 py-2 rounded"
              style={{ border: !isEdit ? 0 : "1px solid" }}
              disabled={!isEdit}
              onChange={handleFormChange}
            />
          </Card.Title>
          <Card.Text>
            {" "}
            <Form.Control
              placeholder={selectedText}
              aria-label="Text input with dropdown button"
              disabled={disable}
              onChange={handleChange}
              value={selectedText}
            />
            <br />
            <DropdownButton
              variant="outline-secondary"
              title="Change Category"
              id="input-group-dropdown-1"
              className="text-center"
              style={{ display: isEdit ? "block" : "none" }}
            >
              {props.categories?.category_array?.map((cat) => (
                <Dropdown.Item onClick={handleSelect}>{cat.name}</Dropdown.Item>
              ))}
              <Dropdown.Item onClick={handleSelect}>
                Other (User Specefic)
              </Dropdown.Item>
            </DropdownButton>
          </Card.Text>
          <Card.Text>
            {" "}
            <input
              type="text"
              value={form_data.data}
              name="data"
              className="w-100 py-2 rounded"
              style={{
                border: !isEdit ? 0 : "1px solid",
                display: isEdit ? "block" : "none",
              }}
              onChange={handleFormChange}
            />
          </Card.Text>
          {isEdit ? undefined : (
            <Button variant="primary" onClick={handleShow}>
              Start Watching
            </Button>
          )}
          <Button variant="danger" onClick={handleDelete}>
            Delete Card
          </Button>
          {isEdit ? undefined : (
            <Button
              variant="warning"
              className="text-dark"
              onClick={handleEdit}
            >
              Edit Card
            </Button>
          )}
          {isEdit ? (
            <Row className="">
              <Col className=" m-0 d-flex justify-content-center">
                <Button
                  className="w-100"
                  variant="success"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </Col>
              <Col className="m-0 d-flex justify-content-start">
                <Button
                  variant="outline-secondary"
                  className="w-100"
                  onClick={handleEdit}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          ) : undefined}
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <video
            id="myVideo"
            width="320"
            height="240"
            controls
            autoPlay
            onTimeUpdate={timeUpdate}
          >
            <source src={props.video}></source>
          </video>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({ categories: state.categories });
export default connect(mapStateToProps, { deleteCard, editCard, addHistory })(
  VideoCard
);
