export function convertTimeToMinutes(timeStr) {
    const [hour, minutes] = timeStr.split(":").map(Number);
    return hour * 60 + minutes;
}