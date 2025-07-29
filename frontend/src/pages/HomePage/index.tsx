import { FC, useEffect, useState } from "react";
import { EventsList } from "../../components/EventsList/EventsList";
import { EventCreator } from "../../components/EventCreator/EventCreator";

const {REACT_APP_API_URL} = process.env

export const HomePage: FC = () => {
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
    }, [])

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <EventCreator />
            <EventsList events={renderableEvents}/>
        </>
    )
};