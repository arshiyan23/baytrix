import '../styles/not-found.css';

const NotFound = () => {
  return (
    <div className="notfound-wrapper">
      <div className="notfound-container">
        <img
          src="/assets/404.webp"
          alt="Page Not Found"
          className="notfound-image"
        />
        <h2>PAGE NOT FOUND</h2>
        <p>The page you are looking for doesn’t exist or has been moved.</p>
        <a href="/">
          ← Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
