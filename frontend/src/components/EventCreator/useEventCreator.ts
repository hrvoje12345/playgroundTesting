import { Dispatch, SetStateAction, useState } from "react";
import { generateTimeOptions } from "../../utils/generateTimeOptions";
import { Event } from "../../pages/HomePage/useHomePage";

const timeOptions = generateTimeOptions()
const defaultTime = '00:00'

const {REACT_APP_API_URL} = process.env;

export const useEventCreator = (setEvents: Dispatch<SetStateAction<Event[]>>) => {
    const [details, setDetails] = useState({eventName: '', date: '', startTime: defaultTime, endTime: defaultTime})
    const [isLoading, setIsLoading] = useState(false);

    const handleOnChange = (value: string, inputType: string) => {
        setDetails((oldDetails) => ({...oldDetails, [inputType]: value}))
    }

    const isCreateEventDisabled = Object.values(details).filter((singleValue) => !singleValue)?.length > 0;

    const handleCreateEvent = async () => {
        setIsLoading(true)

        try {
            const createResponse = await fetch(`${REACT_APP_API_URL}/events`, {method: "POST", credentials: 'include', body: JSON.stringify(details), headers: {'Content-Type': 'application/json'}});

            if (!createResponse.ok) {
                setIsLoading(false)
            }

            const createdEvent = await createResponse.json();

            setEvents((oldEvents) => [...oldEvents, createdEvent])
        } catch(error: unknown) {
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    }

    return {
        details, 
        handleCreateEvent, 
        handleOnChange, 
        isCreateEventDisabled,
        isLoading, 
        timeOptions
    }
}