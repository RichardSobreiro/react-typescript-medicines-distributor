/** @format */

import { useState, useCallback } from "react";

type RequestConfig = {
  url: string;
  method?: string;
  headers?: [string, string][];
  body?: any;
};

export type { RequestConfig };

const useHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback(
    async (requestConfig: RequestConfig, applyData: any) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers
            ? requestConfig.headers
            : { "Content-Type": "application/json; charset=UTF-8" },
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error(await response.text());
        }

        const data = await response.json();
        applyData(data);
      } catch (err: unknown) {
        if (typeof err === "string") {
          setError(err.toString());
        } else {
          setError("Something went wrong!");
        }
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
