import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import "./tempo.css";
import { Link } from "react-router-dom";
import { getlinks } from "../../actions/link";
const Tempo = ({ links, getlinks }) => {
  const id = useParams();

  useEffect(() => {
    getlinks(id.id);
  }, []);

  const clickeonlink = (link) => {
    window.location.herf = link;
  };
  const rendernull = <h1 className="ntl">Not A valid Url</h1>;
  const renderlist = links.map((link) => {
    return (
      <div className="sharing" key={link._id}>
        <a href={link.link}>
          {" "}
          <button className="sharebtn" onClick={(e) => clickeonlink(link.link)}>
            {link.link}
          </button>
        </a>
      </div>
    );
  });
  return (
    <div className="bgblack">
      <br /> <br /> <br /> <br /> <br /> <br />
      {links.length ? <h1 className="h1share_name">{links[0].name}</h1> : null}
      <br />
      {links && renderlist}
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 className="h1nav h1share">
          {" "}
          <i className="fas fa-link"></i> &nbsp;Linkly
        </h1>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  links: state.linkreducer.links,
});

export default connect(mapStateToProps, { getlinks })(Tempo);
