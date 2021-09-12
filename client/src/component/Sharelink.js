import React from "react";
const Sharelink = ({ uid }) => {
  const link = window.location.origin + "/get/links" + "/" + uid;

  return (
    <div>
      <div>
        <input spellCheck="false" className="input2" readOnly value={link} />
      </div>
    </div>
  );
};

export default Sharelink;
