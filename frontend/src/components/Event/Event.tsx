import { FC } from 'react';
import './event.css';

type EventProps = {
  details: { name: string; startDate: string; endDate: string };
};

export const Event: FC<EventProps> = ({ details }) => {
  return (
    <div className="event-mainContainer">
      <h5>{details.name}</h5>
      <p>
        Starting at:{' '}
        {new Date(details.startDate).toLocaleString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
      <p>
        Ending at:{' '}
        {new Date(details.endDate).toLocaleString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
    </div>
  );
};
