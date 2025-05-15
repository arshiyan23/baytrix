function ContactUs() {
    return <div>
        <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>Let’s bring your digital vision to life. Send us a message and we'll get back to you soon.</p>
        <form id="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea rows="5" placeholder="Your Message" required></textarea>
          <button type="submit" className="cta-button">Send Message</button>
        </form>
      </section>
    </div>
    
}

export default ContactUs