import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingBox({ delay }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return show ? (
    <Spinner animation='border' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  ) : null;
}
