const apiURL = import.meta.env.VITE_API_URL;
let url;
if (apiURL) {
    url = apiURL.replace('/api', '');
}

export default function getImageUrl(storyName) {
    return `${url}/images/${storyName}`
}