import React, { useState, useRef, useEffect } from 'react';
import './Contact.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

// EmailJS constants - Replace these with your actual service ID, template ID, and public key
const EMAILJS_SERVICE_ID = 'service_5lj4f93';  // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'template_3z1cg1k'; // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = 'fipRc58oZIB7FgNwj';  // Replace with your Public Key

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState({ show: false, type: '', message: '' });
  
  const formRef = useRef();
  
  // Initialize EmailJS when component mounts
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormStatus({ show: false, type: '', message: '' });
    
    if (!name || !email || !message) {
      setFormStatus({
        show: true,
        type: 'error',
        message: 'Please fill in all fields before sending.'
      });
      setIsLoading(false);
      return;
    }
    
    console.log("name", name, "email", email, "message", message);
    
    // Using sendForm instead of send
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, {
      publicKey: EMAILJS_PUBLIC_KEY,
    })
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setFormStatus({
          show: true,
          type: 'success',
          message: 'Message sent successfully! I will get back to you soon.'
        });
    
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setFormStatus({
          show: true,
          type: 'error',
          message: 'Failed to send message. Please try again or contact me directly at utsavrai2115@gmail.com.'
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
  return (
    <section id="contact" className="contact">
      <div className="container contact-container">
        <div className="section-title">
          <h2>Get In <span>Touch</span></h2>
          <p>Have a question or want to work together? I'd love to hear from you!</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">
                <FaEnvelope />
              </div>
              <div className="info-details">
                <h3>Email</h3>
                <a href="mailto:utsavrai2115@gmail.com">utsavrai2115@gmail.com</a>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <FaPhone />
              </div>
              <div className="info-details">
                <h3>Phone</h3>
                <a href="tel:+918423829911">+918423829911</a>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="info-details">
                <h3>Location</h3>
                <p>Gopalganj, Bihar, India</p>
              </div>
            </div>
            
            <div className="availability">
              <h3>Current Availability</h3>
              <div className="availability-status">
                <span className="status-indicator available"></span>
                <p>Open to freelance & full-time opportunities</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form ref={formRef} className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-header">
                <h3>Send a Message</h3>
                <p>I'll get back to you as soon as possible</p>
              </div>
              
              {formStatus.show && (
                <div className={`form-alert ${formStatus.type}`}>
                  <div className="alert-icon">
                    {formStatus.type === 'success' ? <FaCheck /> : <FaExclamationTriangle />}
                  </div>
                  <p>{formStatus.message}</p>
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="from_name"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  placeholder="Enter your name"
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="user_email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  required 
                  placeholder="What would you like to discuss?"
                  rows={5}
                  disabled={isLoading}
                ></textarea>
              </div>
              
              <input type="hidden" name="reply_to" value={email} />
              <input type="hidden" name="to_name" value="Utsav Rai" />
              
              <button type="submit" className="submit-btn" disabled={isLoading}>
                <span>{isLoading ? 'Sending...' : 'Send Message'}</span>
                {isLoading ? 
                  <div className="btn-loader"></div> : 
                <FaPaperPlane />
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 