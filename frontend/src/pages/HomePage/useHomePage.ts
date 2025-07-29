import { useEffect, useState } from 'react';

const { REACT_APP_API_URL } = process.env;

export type Event = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
};

const availabeDaysRange = ['1', '7', '30'];

export const useHomePage = () => {
  const [renderableEvents, setRenderableEvents] = useState<
    Record<string, Event[]>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [daysRange, setDaysRange] = useState('7');

  const handleDaysRangeSubmit = async () => {
    setIsLoading(false);

    try {
      const response = await fetch(
        `${REACT_APP_API_URL}/events?range=${daysRange}`,
        { method: 'GET', credentials: 'include' },
      );

      if (!response.ok) {
        setIsLoading(false);
      }

      const refreshedEvents = await response.json();
      setRenderableEvents(refreshedEvents);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);

    try {
      const refreshResponse = await fetch(
        `${REACT_APP_API_URL}/events?range=${daysRange}`,
        {
          method: 'PUT',
          credentials: 'include',
        },
      );
      if (!refreshResponse.ok) {
        setIsLoading(false);
      }

      const refreshedEvents = await refreshResponse.json();
      setIsLoading(refreshedEvents);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getEvents = async () => {
    setIsLoading(true);
    try {
      const eventsResponse = await fetch(
        `${REACT_APP_API_URL}/events?range=${daysRange}`,
        { method: 'GET', credentials: 'include' },
      );

      if (!eventsResponse.ok) {
        setIsLoading(false);
      }

      const events = await eventsResponse.json();
      setRenderableEvents(events);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return {
    isLoading,
    renderableEvents,
    setRenderableEvents,
    handleRefresh,
    daysRange,
    setDaysRange,
    handleDaysRangeSubmit,
    availabeDaysRange,
  };
};
