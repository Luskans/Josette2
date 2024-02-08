const apiURL = import.meta.env.VITE_API_URL;
const url = apiURL.replace('/api', '');

export default function getImageUrl(storyName) {
    return `${url}/images/${storyName}`
}