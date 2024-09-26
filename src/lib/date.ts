/**
* HANDLE DATE 
*/
export const getDateCurrent = () => {
    try {
        const currentDateUTC = new Date();
        const timezoneOffset = 7 * 60;
        const utcTime = currentDateUTC.getTime() + (currentDateUTC.getTimezoneOffset() * 60000);
        return new Date(utcTime + (timezoneOffset * 60000));
    } catch (error) {
        console.error("getDateCurrent " + error);
    }

}
export function getBeforeDateCurrent() {
    const oneDayAgo = getDateCurrent();
    if(oneDayAgo){
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        return oneDayAgo;
    }
    return null;
}

export function convertDate(date:Date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
}