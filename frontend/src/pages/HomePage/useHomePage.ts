import { useEffect, useState } from "react";

const {REACT_APP_API_URL} = process.env

export type Event = {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
};

export const useHomePage = () => {
    const [renderableEvents, setRenderableEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleRefresh = async () => {
        setIsLoading(true);

        try {
            const refreshResponse = await fetch(`${REACT_APP_API_URL}/events`, {method: "PUT", credentials: 'include'});
            if (!refreshResponse.ok) {
                setIsLoading(false);
            }

            const refreshedEvents = await refreshResponse.json();
            setIsLoading(refreshedEvents);
        } catch(error: unknown) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }


    const getEvents = async () => {
        setIsLoading(true)
        try {
            const eventsResponse = await fetch(`${REACT_APP_API_URL}/events`, {method: "GET", credentials: 'include'});

            if (!eventsResponse.ok) {
                setIsLoading(false)
            }

            const events = await eventsResponse.json()
            setRenderableEvents(events)
        } catch(error: unknown) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getEvents()
    }, []);

    return {isLoading, renderableEvents, setRenderableEvents, handleRefresh};
}