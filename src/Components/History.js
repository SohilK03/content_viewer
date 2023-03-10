import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

const History = (props) => {
  const { loading, history_array } = props.history;
  //   useEffect(() => {
  //     getHistory();
  //   }, [getHistory]);

  return loading ? (
    <h1>Loading</h1>
  ) : (
    <React.Fragment>
      {history_array
        ?.slice(0)
        .reverse()
        .map((hist, key) => 

         {const card_details=props.cards.cards_array?.find((e) => e.id === hist.card_id)
          return  <Container
            key={key}
            className="p-2 my-3 border border-success rounded"
          >
            <Row>
              <Col>{card_details?.name}</Col>
            </Row>
            <Row>
              <Col sm={8}>{card_details?.category}</Col>
              <Col className="d-flex justify-content-end">{hist.date}</Col>
              <Col className="d-flex justify-content-end">
                {hist.time_watched}
              </Col>
            </Row>
          </Container>}
        )}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  history: state.history,
  cards: state.cards,
});
export default connect(mapStateToProps, {})(History);
