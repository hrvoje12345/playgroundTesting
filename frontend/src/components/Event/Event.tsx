import { FC } from "react";
import './event.css'

type EventProps = {
    details: {name: string;
    start: string;
    end: string;}
}

export const Event: FC<EventProps> = ({details}) => {
    return (
        <div className="event-mainContainer">
            <h5>{details.name}</h5>
            <p>Starting at: {details.start}</p>
            <p>Ending at: {details.end}</p>
        </div>
    )
};