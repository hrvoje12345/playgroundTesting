import { FC } from 'react';
import { EventsList } from '../../components/EventsList/EventsList';
import { EventCreator } from '../../components/EventCreator/EventCreator';
import { useHomePage } from './useHomePage';
import { Button } from '../../components/Button/Button';

import './index.css';

export const HomePage: FC = () => {
  const {
    isLoading,
    renderableEvents,
    setRenderableEvents,
    handleRefresh,
    daysRange,
    setDaysRange,
    handleDaysRangeSubmit,
    availabeDaysRange,
  } = useHomePage();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="home-main_container">
      <EventsList
        events={renderableEvents}
        daysRange={daysRange}
        setDaysRange={setDaysRange}
        availabeDaysRange={availabeDaysRange}
        handleDaysRangeSubmit={handleDaysRangeSubmit}
      />

      <div>
        <EventCreator setEvents={setRenderableEvents} />
        <Button onClick={handleRefresh} label="Refresh calendar" />
      </div>
    </div>
  );
};
