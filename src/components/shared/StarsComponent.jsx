import React from 'react';
import Star from "../../assets/icons/Star.svg";
import StarEmpty from "../../assets/icons/StarEmpty.png";

export const StarsComponent = ({ rating }) => {
  return (
    <div style={{ display: 'flex', gap: '0px' }}>
      {rating && rating > 0
        ? Array.from({ length: rating }, (_, index) => (
            <img key={`filled-${index}`} src={Star} alt="Star" height={30} />
          ))
        : Array.from({ length: 5 }, (_, index) => (
          <img key={`empty-${index}`} src={StarEmpty} alt="Star Empty" height={12} />
        ))}
    </div>
  );
};
