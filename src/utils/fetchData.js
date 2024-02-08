export const exerciseOptions = {
    method: 'GET',
    params: { limit: '50' },
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
};
export const youtubeOptions = {
    method: 'GET',

    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
};
export const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();
    // console.log('data', data);
    return data;
}