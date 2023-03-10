import React, { useEffect, useState } from "react";
import {
  InputGroup,
  Form,
  Button,
  Container,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { connect } from "react-redux";
import { getCategories } from "../redux/Actions/CategoryActions";
import { addCard, getCards } from "../redux/Actions/CardActions";
const AddCard = (props) => {
  const { getCategories } = props;
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  const [form_data, setData] = useState({ name: "", data: "" });
  const [selectedText, setText] = useState("Choose Category");
  const [disable, setDisable] = useState(true);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const final_data = { ...form_data, category: selectedText };
    props.addCard(final_data, selectedText, props.categories.category_array);
    setData({ name: "", data: "" });
    setDisable(true);
    setText("Choose Category");
  };
  return (
    <Container className="d-flex flex-column align-items-center w-sm-100 w-md-50">
      <h3 className="text-center">Add New Card</h3>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Card Title</InputGroup.Text>
        <Form.Control
          placeholder="Card Title"
          aria-label="Card Title"
          aria-describedby="basic-addon1"
          name="name"
          value={form_data.name}
          onChange={handleFormChange}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        {" "}
        <Form.Control
          placeholder={selectedText}
          aria-label="Text input with dropdown button"
          disabled={disable}
          onChange={handleChange}
          value={selectedText}
        />
        <DropdownButton
          variant="outline-secondary"
          title="Choose Category"
          id="input-group-dropdown-1"
        >
          {props.categories?.category_array?.map((cat) => (
            <Dropdown.Item onClick={handleSelect}>{cat.name}</Dropdown.Item>
          ))}
          <Dropdown.Item onClick={handleSelect}>
            Other (User Specefic)
          </Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      <InputGroup>
        {" "}
        <InputGroup.Text id="basic-addon2">Video/Mp3 Link</InputGroup.Text>
        <Form.Control
          placeholder="Paste the link"
          aria-label="Video Link"
          aria-describedby="basic-addon2"
          name="data"
          value={form_data.data}
          onChange={handleFormChange}
        />
      </InputGroup>
      <Button type="submit" className="my-3" onClick={handleSubmit}>
        Add The Card
      </Button>
    </Container>
  );
};
const mapStateToProps = (state) => ({ categories: state.categories });
export default connect(mapStateToProps, { getCategories, addCard, getCards })(
  AddCard
);
