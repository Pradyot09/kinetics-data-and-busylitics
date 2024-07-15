import React from 'react';

  // Convert the timestamp and format the date and time
const DateTimeUtility = ({ timestamp }) => {
  const seconds = timestamp.seconds;
  const nanoseconds = timestamp.nanoseconds;

  const milliseconds = (seconds * 1000) + (nanoseconds / 1000000);
  const date = new Date(milliseconds);


  const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD

  return (
      <p>{formattedDate}</p>
  );
};

export  { DateTimeUtility };