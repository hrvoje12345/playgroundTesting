import { FC } from 'react';
import { Event } from '../Event/Event';
import { Button } from '../Button/Button';
import { type Event as EventType } from '../../pages/HomePage/useHomePage';
import './eventsList.css';

type EventsListProps = {
  events: Record<string, EventType[]>;
  daysRange: string;
  setDaysRange: (val: string) => void;
  availabeDaysRange: string[];
  handleDaysRangeSubmit: () => void;
};

export const EventsList: FC<EventsListProps> = ({
  events = {},
  daysRange,
  setDaysRange,
  availabeDaysRange,
  handleDaysRangeSubmit,
}) => {
  return (
    <>
      <h3>Events</h3>

      <div className="event_list-days_range_main_container">
        <label>
          Days range:
          <select
            value={daysRange}
            onChange={(e) => setDaysRange(e.target.value)}
          >
            {availabeDaysRange.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </label>

        <Button label="Confirm day range" onClick={handleDaysRangeSubmit} />
      </div>

      <ul>
        {Object.entries(events).map(([group, groupEvents]) => (
          <li key={group} className="event_list-group_container">
            <h4>{group}</h4>
            {groupEvents.map((singleEvent) => (
              <div key={singleEvent.id} className="event_list-event_container">
                <Event details={singleEvent} />
              </div>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
};
