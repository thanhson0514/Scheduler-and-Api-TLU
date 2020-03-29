import React, { Fragment, useState, useContext } from "react";

import AuthContext from "../../actions/auth/authContext";
import "./SendPhone.css";

export const SendPhone = () => {
  const authContext = useContext(AuthContext);
  const [formData, setFormData] = useState({
    phone: "",
    text: ""
  });

  const { phone, text } = formData;
  const { sendEmail } = authContext;
  const onSend = e => {
    e.preventDefault();
    sendEmail(formData);
  };
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Fragment>
      <div className="container-phone">
        <form onSubmit={onSend}>
          <h1>Comments and Rate</h1>
          <input
            placeholder="phone"
            type="phone"
            value={phone}
            name="phone"
            onChange={onChange}
            maxLength="200"
            required
          />
          <textarea
            placeholder="Comments"
            type="text"
            value={text}
            name="text"
            onChange={onChange}
            required
          ></textarea>
          <button type="submit">Send</button>
          <p>Gửi free nhé hihi!</p>
        </form>
      </div>
    </Fragment>
  );
};
