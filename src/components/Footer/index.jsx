import React from 'react';
import { Chip } from '@material-ui/core';
import { TAGS } from './constants';
import './Footer.css';


export function Footer() {
  return (
    <div className="footer">
      <div className="tags">
        {TAGS.map(tag => (
          <Chip key={tag} label={tag} color="secondary" size="small" />
        ))}
      </div>
      <div>
        <span>Спасибо </span>
        <a href="https://www.themoviedb.org/" className="tmdbLink">themoviedb</a>
        <span> за предоставленную информацию.</span>
      </div>
      <div>
        По всем вопросам, жалобам и предложениям abakshin.pavl@yandex.ru
      </div>
      <div>&copy; MovieTown 2019</div>
    </div>
  );
}
