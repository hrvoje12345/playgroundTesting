import { useState } from "react";
import { fetchApi } from "../../utils/fetchApi";
import { generateTimeOptions } from "../../utils/generateTimeOptions";

const timeOptions = generateTimeOptions()
const defaultTime = '00:00'

export const useEventCreator = () => {
    const [details, setDetails] = useState({eventName: '', date: '', startTime: defaultTime, endTime: defaultTime})
    const [isLoading, setIsLoading] = useState(false);

    const handleOnChange = (value: string, inputType: string) => {
        setDetails((oldDetails) => ({...oldDetails, [inputType]: value}))
    }

    const isCreateEventDisabled = Object.values(details).filter((singleValue) => !singleValue)?.length > 0;

    const handleCreateEvent = async () => {
        setIsLoading(true)

        try {
            const response = await fetchApi('events', {method: 'POST', body: JSON.stringify(details)})

            if (!response.ok) {
                setIsLoading(false)
            }


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