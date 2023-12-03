/* eslint-disable @typescript-eslint/no-explicit-any */
import "../../styles/contact.css";
import { useState } from "react";
import { send } from "emailjs-com";

function Contact() {
  const [toSend, setToSend] = useState({
    from_name: "",
    message: "",
    reply_to: "",
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    send("service_contact", "template_contact", toSend, "USER ID")
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch((err) => {
        console.log("FAILED...", err);
      });
  };

  const handleChange = (e: any) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>Send Message</h2>
        <div className="inputBox">
          <input
            type="text"
            name="from_name"
            value={toSend.from_name}
            onChange={handleChange}
            required
          />
          <span>Full Name</span>
        </div>
        <div className="inputBox">
          <input
            type="text"
            name="reply_to"
            value={toSend.reply_to}
            onChange={handleChange}
            required
          />
          <span>Email</span>
        </div>
        <div className="inputBox">
          <textarea
            required
            name="message"
            value={toSend.message}
            onChange={handleChange}
          ></textarea>
          <span>Type your Message...</span>
        </div>
        <input type="submit" className="btn hover_in_shadow" value="Send" />
      </form>
    </div>
  );
}

export default Contact;
