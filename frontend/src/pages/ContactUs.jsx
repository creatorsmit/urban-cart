import React from 'react';

const ContactUs = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Contact Us</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <h2>Get in Touch</h2>
          <p>If you have any questions, comments, or concerns, please feel free to reach out to us. We're here to help!</p>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea className="form-control" id="message" rows="5" placeholder="Enter your message"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="col-md-6 mb-4">
          <h2>Contact Information</h2>
          <p><strong>Email:</strong> shopurbancart@gmail.com</p>
          <p><strong>Phone:</strong> +1 (905)-768-4576</p>
          <p><strong>Address:</strong> UrbanCart, 75 Watline Av. , Mississaugua, ON L4Z 3E5, Canada.</p>
          <h2 className="mt-4">Follow Us</h2>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="https://www.facebook.com/urbancart" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.twitter.com/urbancart" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
                <i className="fab fa-twitter"></i> Twitter
              </a>
            </li>
            <li className="list-inline-item">
              <a href="https://www.instagram.com/urbancart" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;