import { createContext, useContext } from 'react';

const UtilsContext = createContext({});

export function UtilsProvider({ children }){
    const getTodayDate = () => {
        const todayDate = new Date();
        const format = "aaaa-mm-dd";

        const map = {
            aaaa: (todayDate.getFullYear()).toString(),
            mm: (todayDate.getMonth() + 1).toString(),
            dd: (todayDate.getDate()).toString(),
        }

        // * verifying if the month and day are complete
        if (map.mm.length !== 2){
            map.mm = "0".concat(map.mm);
        } if (map.dd.length !== 2){
            map.dd = "0".concat(map.dd);
        }

        return format.replace(/aaaa|mm|dd/gi, matched => map[matched]);
    }

    const getTodayHour = () => {
        const todayDate = new Date();
        const format = "hh:mm";

        const map = {
            hh: (todayDate.getHours()).toString(),
            mm: (todayDate.getMinutes()).toString(),
        }

        if (map.hh.length != 2){
            map.hh = "0".concat(map.hh);
        } if (map.mm.length != 2){
            map.mm = "0".concat(map.mm);
        }

        return format.replace(/hh|mm/gi, matched => map[matched]);
    }

    return(
        <UtilsContext.Provider value = { {getTodayDate, getTodayHour} }>
            { children }
        </UtilsContext.Provider>
    );
}

export function useUtils(){
    const context = useContext(UtilsContext);
    return context;
}

export default UtilsContext;