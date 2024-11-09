// src/pages/profile/Schedule.jsx
import React from 'react';

const Schedule = () => (
  <section className="schedule">
    <h2>내 시간표</h2>
    <div className="calendar">
      <div className="time">9 AM</div>
      <div className="time">10 AM</div>
      <div className="time">11 AM</div>
      <div className="time">Noon</div>
      <div className="time">1 PM</div>

      <div className="event" style={{ gridColumn: 2, gridRow: '2 / span 2' }}>운동 물리학<br />10:00 - 11:30</div>
      <div className="event orange" style={{ gridColumn: 3, gridRow: '2 / span 2' }}>선형대수학<br />10:00 - 11:30</div>
      <div className="event teal" style={{ gridColumn: 4, gridRow: '2 / span 2' }}>화학개론<br />10:00 - 11:30</div>
    </div>
  </section>
);

export default Schedule;
