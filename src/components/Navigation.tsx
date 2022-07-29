import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="flex h-12 shadow-md items-center justify-between px-5 bg-slate-700 text-white">
      <Link className="mr-2 hover:text-sky-300" to="/">
        <h3 className="font-bold">Github search</h3>
      </Link>
      <span>
        <Link className="mr-2 hover:text-sky-300" to="/">Home</Link>
        <Link className="hover:text-sky-300" to="/favorites">Favorites</Link>
      </span>
    </nav>
  );
}
