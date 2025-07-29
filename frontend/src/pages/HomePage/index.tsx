import { FC } from "react";
import { EventsList } from "../../components/EventsList/EventsList";
import { EventCreator } from "../../components/EventCreator/EventCreator";
import { useHomePage } from "./useHomePage";
import { Button } from "../../components/Button/Button";

export const HomePage: FC = () => {
    const {isLoading, renderableEvents, setRenderableEvents, handleRefresh} = useHomePage();

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <EventCreator setEvents={setRenderableEvents}/>
            <Button onClick={handleRefresh} label="Refresh calendar"/>
            <EventsList events={renderableEvents}/>
        </>
    )
};