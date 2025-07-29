import { FC, useEffect, useState } from "react";
import { EventsList } from "../../components/EventsList/EventsList";
import { EventCreator } from "../../components/EventCreator/EventCreator";
import { useHomePage } from "./useHomePage";

const {REACT_APP_API_URL} = process.env

export const HomePage: FC = () => {
    const {isLoading, renderableEvents} = useHomePage();

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