import { Row, Col, Container, Tabs, Tab } from "react-bootstrap";
import "./App.css";
import AddCard from "./Components/AddCard";
import Cards from "./Components/Cards";
import History from "./Components/History";
import { connect } from "react-redux";
import { getHistory } from "./redux/Actions/HistoryActions";
function App(props) {
  const handleHistory = (e) => {
    if (e === "second") props.getHistory();
  };
  return (
    <div className="App">
      <Container fluid>
        <Row className="">
          <Col className="text-center text-light">
            {" "}
            <h1 className="d-inline-block p-3 mt-2 hero-heading">CONTENT</h1>
          </Col>
        </Row>
      </Container>
      <Container className="mt-4">
        <AddCard />
        <Tabs
          defaultActiveKey="first"
          className="justify-content-center"
          onSelect={handleHistory}
        >
          <Tab eventKey="first" title="Videos">
            <Cards />
          </Tab>
          <Tab eventKey="second" title="History">
            <History />
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}
const mapStateToProps = (state) => ({ cards: state.cards });
export default connect(mapStateToProps, { getHistory })(App);
