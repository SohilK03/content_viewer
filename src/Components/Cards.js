import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Card from "./VideoCard";
import { connect } from "react-redux";
import { getCards } from "../redux/Actions/CardActions";
const Cards = (props) => {
  const { getCards } = props;
  useEffect(() => {
    getCards();
  }, [getCards]);
  return (
    <div>
      <Row
        className="justify-content-md-center
      "
      >
        {props.cards.loading ? (
          <h1>Loading...</h1>
        ) : (
          props.cards?.cards_array?.map((card, key) => (
            <Col className="d-flex justify-content-center">
              <Card
                key={key}
                id={card.id}
                category={card.category}
                title={card.name}
                video={card.data}
              />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};
const mapStateToProps = (state) => ({ cards: state.cards });
export default connect(mapStateToProps, { getCards })(Cards);
