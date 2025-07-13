import  React, { useState } from 'react'; // Correct import
import location_icon from '../assets/location-icon.png';
import mail_icon from '../assets/mail-icon.png';
import msg_icon from '../assets/msg-icon.png';
import phone_icon from '../assets/phone-icon.png';
import './Contact.css';

const Contact = () => {
  const [result, setResult] = useState(""); // Correct usage

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
    formData.append("access_key", "f58bddc4-2227-4b67-9a4b-889225bfc76d");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="contact">
      <div className="contact-col">
        <h3>
          Contact Us <img src={msg_icon} alt="message icon" />
        </h3>
        <p>
          Feel free to reach out using our contact form or find our details
          below. Your feedback, questions, and suggestions help us to serve the
          community even better.
        </p>
        <ul>
          <li>
            <img src={mail_icon} alt="email icon" />
            contact@organicfarm
          </li>
          <li>
            <img src={phone_icon} alt="phone icon" />
            +1 123-456-7890
          </li>
          <li>
            <img src={location_icon} alt="location icon" />
            35/1 Francy Street, Salem
            <br /> TamilNadu, India
          </li>
        </ul>
      </div>

      <div className="contact-col">
        <form onSubmit={onSubmit}>
          <label>Your name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter mail id"
            required
          />
          <label>Write your Messages here</label>
          <textarea
            name="message"
            rows="6"
            placeholder="Enter your Message"
            required
          ></textarea>
          <button type="submit">Submit now</button>
        </form>
        {result && <span className="form-result">{result}</span>}
      </div>
    </div>
  );
};

export default Contact;
