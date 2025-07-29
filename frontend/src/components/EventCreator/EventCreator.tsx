import { FC, Dispatch, SetStateAction} from "react";
import './eventCreator.css'
import { Button } from "../Button/Button";
import { useEventCreator } from "./useEventCreator";
import { Event } from "../../pages/HomePage/useHomePage";

type EventCreatorProps = {
    setEvents: Dispatch<SetStateAction<Event[]>>
}

export const EventCreator: FC<EventCreatorProps> = ({setEvents}) => {
    const {
        handleOnChange, 
        timeOptions, 
        details, 
        handleCreateEvent, 
        isLoading, 
        isCreateEventDisabled
    } = useEventCreator(setEvents);

    return (
        <div className="event_creator-main_container">
            <h3>Create event</h3>

            <label>
                Event Name:
                <input onChange={(e) => handleOnChange(e.target.value, 'eventName')} name="eventName" />
            </label>

            <label>
                Date:
                <input onChange={(e) => handleOnChange(e.target.value, 'date')} name="date" type="date" />
            </label>

            <label>
                Start time
                <select value={details.startTime} onChange={(e) => handleOnChange(e.target.value, 'startTime')}>
                    {timeOptions.map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                    ))}
                </select>
            </label>
            <label>
                End time
                <select value={details.endTime} onChange={(e) => handleOnChange(e.target.value, 'endTime')}>
                    {timeOptions.map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                    ))}
                </select>
            </label>

            <Button onClick={handleCreateEvent} label="Create event" isLoading={isLoading} isDisabled={isCreateEventDisabled}/>
        </div>
    )
}