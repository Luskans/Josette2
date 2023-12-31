export default function localDate(date) {
    let newDate = new Date(date);
    let formattedDate = newDate.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: '2-digit'
    });
    return formattedDate;
}