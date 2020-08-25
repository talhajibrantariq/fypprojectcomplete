import React from 'react';
import Menu from './Menu'
function patientHome() {
  return (
      <div>
        <Menu />
        <div className="jumbotron">
            <h2>React Home</h2>
            <p className="leaad">Welcome home</p>
        </div>
      </div>
  );
}

export default patientHome;
