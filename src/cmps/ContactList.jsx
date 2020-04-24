import React from "react";
import { Link } from "react-router-dom";
import ContactPreview from "./ContactPreview";

export default function ContactList(props) {
  return (
    <section className="contact-list-container">
      {props.contacts.map((contact) => (
        <Link to={"/contact/" + contact._id} key={contact._id}>
          <ContactPreview contact={contact} />  
        </Link>
      ))}
    </section>
  );
}
