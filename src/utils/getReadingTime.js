export default function readingTime(charNumber) {
    const charPerWord = 5.1; // moyenne en français, espace compris
    const wordPerMinute = 220; // vitesse de lecture moyenne
  
    let wordNumber = charNumber / charPerWord;
    let readingTime = (wordNumber / wordPerMinute) * 60; // en secondes
    let minutes = Math.floor(readingTime / 60);
    let secondes = Math.round(readingTime);

    if (minutes === 0) {
        return `${secondes + 1} sec read`;
    } else {
        return `${minutes} min read`;
    }
  }