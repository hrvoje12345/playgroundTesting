export const generateTimeOptions = (start = 0, end = 24, step = 30) => {
    const times: string[] = [];
  
    for (let h = start; h < end; h++) {
      for (let m = 0; m < 60; m += step) {
        const hour = h.toString().padStart(2, '0');
        const minute = m.toString().padStart(2, '0');
        times.push(`${hour}:${minute}`);
      }
    }
  
    return times;
  };