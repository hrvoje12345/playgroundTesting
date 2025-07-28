import { FC } from "react";
import {Event} from '../../components/Event/Event'

const eventsMock = [{name: 'Event jedan', start: new Date().toDateString(), end: new Date().toDateString()}]

export const HomePage: FC = () => {
    return (
        <ul>
            {eventsMock.map((singleEvent) => <div><Event details={singleEvent}/></div>)}
        </ul>
    )
};