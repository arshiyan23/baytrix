import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ imgSrc, title, desc, link }) => {
  const navigate = useNavigate();

  const btnClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div className="service-item" onClick={btnClick}>
      <h3>{title}</h3>
      <img src={imgSrc} alt={title} className="service-image" />
      <p>{desc}</p>
      <div className='view-more-txt'>View More <span className="arrow">→</span></div>
    </div>
  );
};

export default ServiceCard;



// < -- Backup Code -- >

// import React from 'react';
// import { Link } from 'react-router-dom';

// const ServiceCard = ({ imgSrc, title, desc, link }) => {
//   return (
//     <div className="service-item">
//       <img src={imgSrc} alt={title} className="service-image" />
//       <h3>{title}</h3>
//       <p>{desc}</p>
//       {link && (
//         <Link to={link} className="view-more-btn">
//           View More <span className="arrow">→</span>
//         </Link>
//       )}
//     </div>
//   );
// };

// export default ServiceCard;

