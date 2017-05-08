import React from 'react';
import { Link } from 'react-router';

import { Header } from 'linode-components/navigation';


export default function Layout(props) {
  const { route } = props;
  const { endpoints } = route;

  return (
    <div className="Layout">
      <Header></Header>
      <div className="Layout-container container">
        <div className="Layout-navigationContainer">
          <div className="VerticalNav">
            <div className="VerticalNav-section">
              <h3>Getting Started</h3>
              <ul>
                <li><Link to="/introduction">Introduction</Link></li>
                <li><Link to="/authentication">Authentication</Link></li>
                <li><Link to="/lists-objects">Lists &amp; Objects</Link></li>
                <li><Link to="/pagination">Pagination</Link></li>
                <li><Link to="/editing-objects">Editing Objects</Link></li>
                <li><Link to="/filtering">Filtering</Link></li>
                <li><Link to="/errors">Errors</Link></li>
              </ul>
            </div>
            <div className="VerticalNav-section">
              <h3>Reference</h3>
              <ul>
                {endpoints.map(function(endpoint, index) {
                  return (<li key={index}><Link to={endpoint.routePath}>{endpoint.name}</Link></li>);
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="Layout-content">
          {props.children}
        </div>
      </div>
    </div>
  );
};
