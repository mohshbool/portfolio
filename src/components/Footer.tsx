import React from 'react';
import { Social } from 'data';

interface FooterProps {
  social: Social[];
  name: string;
}

const Footer: React.FC<FooterProps> = ({ social, name }) => {
  return (
    <footer>
      <div className="col-md-12">
        <div className="social-links">
          {social.map(network => (
            <span key={network.name} className="m-4">
              <a href={network.url} target="_blank" rel="noopener noreferrer">
                <i className={network.class}></i>
              </a>
            </span>
          ))}
        </div>

        <div className="copyright py-4 text-center">
          <div className="container">
            <small>
              Copyright &copy; {name} {new Date().getFullYear()}
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
