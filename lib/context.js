import { useContext, createContext } from "react";

export const AppContext = createContext(null);

export default function useAppConxtex() {
    return useContext(AppContext);
}
