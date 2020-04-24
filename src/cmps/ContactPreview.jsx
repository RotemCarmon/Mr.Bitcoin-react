import React from "react";

const ContactPreview = (props) => {
  const { ...contact } = props.contact;
  
  return (
    <div>
      { contact &&
      <section className="contact-preview-container flex align-center">
        <div className="contact-img ratio-square">
          <img
            src={`https://robohash.org/${contact._id}?set=set2`}
            alt="Profile"
          />
        </div>
        <span className="contact-name">{contact.name}</span>
      </section> }
    </div>
  );
};

export default ContactPreview;
