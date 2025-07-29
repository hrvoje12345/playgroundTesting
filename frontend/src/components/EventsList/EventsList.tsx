import { FC, useState } from "react";
import {Event} from '../Event/Event'
import './eventsList.css'
import { Button } from "../Button/Button";
import { useEventList } from "./useEventList";

type EventsListProps = {
    events: {name: string, startDate: string, endDate: string, id: string}[]
}


export const EventsList: FC<EventsListProps> = ({events = []}) => {
    const {daysRange, setDaysRange, handleDaysRangeSubmit, availabeDaysRange} = useEventList();

    return (
        <>
            <h3>Events</h3>

            <div className="eventList-daysRangeMainContainer">
                <label>
                    Days range:
                    <select value={daysRange} onChange={(e) => setDaysRange(e.target.value)}>
                        {availabeDaysRange.map((range) => (
                            <option key={range} value={range}>
                            {range}
                        </option>
                        ))}
                    </select>
                </label>

                <Button label="Confirm day range" onClick={handleDaysRangeSubmit}/>
            </div>

            <ul>
                {events.map((singleEvent) => <div key={singleEvent.id} className="eventList-eventContainer"><Event details={singleEvent}/></div>)}
            </ul>
        </>
    )
}