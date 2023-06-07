import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { access_token } = queryString.parse(location.search);
    window.close();
    navigate('/playlist');
  }, [location, navigate]);

  return null;
};

export default Callback;