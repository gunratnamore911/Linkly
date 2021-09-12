import React from "react";
import { connect } from "react-redux";
import "./card.css";
import { deletelink } from "../actions/auth";
const Card = (props) => {
  const deletell = (id) => {
    props.deletelink(id);
  };
  return (
    <div className="card_main" key={props.id}>
      <h1 className="card_h1">{props.link}</h1>
      <button className="ts" onClick={(e) => deletell(props.id)}>
        <i className="fas fa-trash "></i> Delete
      </button>
    </div>
  );
};

export default connect(null, { deletelink })(Card);
