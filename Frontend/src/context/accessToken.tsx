'use client'
import { createContext, useContext, useState } from "react";
import { Dispatch, SetStateAction } from "react";

type AccessContextType = {
    accessToken: string | null;
    setAccessToken: Dispatch<SetStateAction<string | null>>;
};

const AccessContext = createContext<AccessContextType>({
    accessToken: null,
    setAccessToken: () => {},
});

export default function AccessToken({ children }) {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    return (
        <AccessContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AccessContext.Provider>
    );
}

export function useAccessToken(): AccessContextType {
    return useContext(AccessContext);
}
