import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../settings';
import LogoWhite from '../../../public/images/dash-logo-white.png';

export default ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link to="/dashboard">
              <i className={siteConfig.siteIcon} />
            </Link>
          </h3>
        </div>
      ) : (
        <h3>
          <Link to="/dashboard">
            <img style={{ 'height': '40px' }} src={LogoWhite}/>
          </Link>
        </h3>
      )}
    </div>
  );
};
