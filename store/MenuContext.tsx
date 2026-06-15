import React, { createContext, useContext, useMemo, useState} from "react";
import { MenuItem } from "../types/menu";

type MenuContextType = {
    menuItems: MenuItem[];
    addItem: (item: MenuItem) => void;
    clearMenu: () => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

type MenuProviderProps = React.PropsWithChildren;

export function MenuProvider ({children}: MenuProviderProps) {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    const addItem = (item: MenuItem) => {
        setMenuItems((prev: MenuItem[]) => [...prev, item]);
    };

    const clearMenu = () => {
        setMenuItems([]);
    };

    const value = useMemo(
        () => ({
            menuItems,
            addItem,
            clearMenu,
        }),
        [menuItems]
    );

    return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu(){
    const context = useContext(MenuContext);

    if (!context) {
        throw new Error("useMenu must be used inside a MenuProvider");
    }

    return context;
}