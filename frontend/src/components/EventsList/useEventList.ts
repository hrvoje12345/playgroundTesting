import { useState } from "react";

const availabeDaysRange = [3,7,9]

export const useEventList = () => {
    const [daysRange, setDaysRange] = useState('7');
    const [isLoading, setIsLoading] = useState(false);

    const handleDaysRangeSubmit = () => {
        setIsLoading(false) 

        try {
            const response = fetch('someRoute', {method: 'POST', body: JSON.stringify(daysRange)})
        } catch(error: unknown) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    return {daysRange, setDaysRange, handleDaysRangeSubmit, availabeDaysRange}
}