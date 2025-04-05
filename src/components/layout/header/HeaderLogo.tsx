
import React from 'react';
import { Link } from 'react-router-dom';

export const HeaderLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="font-bold text-xl">Logo</span>
    </Link>
  );
};
