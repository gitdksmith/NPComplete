import { ActivitiesData } from './activitiesDataInterface';
import { ParkData } from './parkDataInterface';


const requestOptions = {
    method: 'GET',
    headers: {
        'x-api-key': process.env.NP_X_API_KEY || '',
    },
}

export async function getParkData(): Promise<{ total: string, limit: string, start: string, data: ParkData[] }> {

    const checkRes = await fetch(`https://developer.nps.gov/api/v1/parks?limit=1`, requestOptions);
    const checkResJson = await checkRes.json();
    const limit = process.env.NODE_ENV == 'development' ? 150 : checkResJson.total;
    // TODO get this into redux and don't fetch if already in state
    // TODO suspense/loading wrapper
    // NextJS complains that the response size is too large to cache (>2MB)
    const res = await fetch(`https://developer.nps.gov/api/v1/parks?limit=${limit}`, requestOptions);

    // TODO: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export async function getActivityData(): Promise<ActivitiesData> {
    // could do singleton pattern style and check if variable already populated else make request
    // but nextjs will already cache this response, so no need. 
    const checkRes = await fetch(`https://developer.nps.gov/api/v1/activities?limit=1`, requestOptions);
    const checkResJson = await checkRes.json();
    const limit = checkResJson.total;
    const res = await fetch(`https://developer.nps.gov/api/v1/activities?limit=${limit}`, requestOptions);

    // TODO: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}