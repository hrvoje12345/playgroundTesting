const {RACT_APP_BASE_API_URL} = process.env

export const fetchApi = (
    url: string,
    options: RequestInit = {},
  ): Promise<Response> => {
    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include' as RequestCredentials,
      ...options,
    };
  
    return fetch(`${RACT_APP_BASE_API_URL}/${url}`, mergedOptions);
  };
  