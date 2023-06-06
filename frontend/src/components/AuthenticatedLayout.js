import React from 'react';
import Header from './Header';
function AuthenticatedLayout({ children }) {

  return (
    <div className="container">
      <Header />
      <div className="content">
        <main className="main">{children}</main>
      </div>
    </div>
  );
}

export default AuthenticatedLayout;
