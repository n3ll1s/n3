/**
 * Converts a given time to Moscow time (UTC+3).
 * @param {string} dateTimeStr - The date time string in a valid date-time format.
 * @returns {string} - The date and time formatted as a string in Moscow timezone.
 */
function convertToMoscowAndTime(dateTimeStr: string) {
    const date = new Date(dateTimeStr);
    return date.toLocaleString('ru-RU', {
        timeZone: 'Europe/Moscow',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
}
export default convertToMoscowAndTime