import React from 'react';

export default function Card(props) {
  const cardStyle = {
    width: '16rem',
    border: '1px solid grey',
    margin: '10px',
    padding: '10px',
    borderRadius: '4px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    background: 'white'
  };

  const cardTitleStyle = {
    fontSize: '1.25rem',
    marginBottom: '0.5rem',
    fontWeight: 'bold'
  };

  const cardSubtitleStyle = {
    color: 'grey',
    fontSize: '0.875rem',
    marginBottom: '0.25rem'
  };

  const cardText = {
    marginBottom: '1rem'
  };

  return (
    <div className="card" style={cardStyle}>
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted" style={cardSubtitleStyle}>{props.name}</h6>
        <p className="card-text" style={cardText}>{props.desc}</p>
        <div style={{ textAlign: 'left', height: '23px' }}>
          <h6 className="card-subtitle mb-2 text-muted" style={cardSubtitleStyle}>{props.tag}</h6>
        </div>
      </div>
    </div>
  );
}
