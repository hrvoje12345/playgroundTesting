import { useEffect, useState } from "react";

const {REACT_APP_API_URL} = process.env

export const useHomePage = () => {
    const [renderableEvents, setRenderableEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    return {isLoading, renderableEvents};
}