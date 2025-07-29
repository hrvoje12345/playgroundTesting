import { FC, useEffect } from "react";
import { EventsList } from "../../components/EventsList/EventsList";
import { EventCreator } from "../../components/EventCreator/EventCreator";

const eventsMock = [
    {name: 'Event 1', start: new Date().toDateString(), end: new Date().toDateString(), id: '1'},
    {name: 'Event 2', start: new Date().toDateString(), end: new Date().toDateString(), id: '2'},
];

const {REACT_APP_API_URL} = process.env

export const HomePage: FC = () => {
    const getEvents = async () => {
        try {
            const eventsResponse = await fetch(`${REACT_APP_API_URL}/events`, {method: "GET", credentials: 'include'});

            const events = await eventsResponse.json()
        } catch(error: unknown) {
            console.error(error)
        }
    }

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <>
            <EventCreator />
            <EventsList events={eventsMock}/>
        </>
    )
};