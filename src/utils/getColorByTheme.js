export default function getColorByTheme(themeName) {
    const themes = {
      'Fantasy': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-200',
      'Sci-fi': 'bg-green-100 text-green-800 dark:bg-green-200',
      'Horreur': 'bg-purple-100 text-purple-800 dark:bg-purple-200',
      'Romance': 'bg-pink-100 text-pink-800 dark:bg-pink-200',
      'Moderne': 'bg-blue-100 text-blue-800 dark:bg-blue-200',
      'Poème': 'bg-gray-100 text-gray-800 dark:bg-gray-200',
    };
  
    return themes[themeName] || 'bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800';
}