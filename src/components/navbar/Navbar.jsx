import React, { useState, useEffect } from 'react';
import './navbar.css';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsCollapsed(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`Header ${isCollapsed ? 'collapsed' : ''}`}>
      <h1 className="Header-title">Sachin's Blog</h1>
    </div>
  );
};

export default Navbar;
