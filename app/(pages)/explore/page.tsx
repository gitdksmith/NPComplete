import { Metadata } from 'next';
import { ParkData } from './parkDataInterface';
import ParkList from '../../components/parkList';
import styles from '../page.module.css';


async function getParkData(): Promise<{ data: ParkData[] }> {
  const requestOptions = {
    method: 'GET',
    headers: {
      'x-api-key': process.env.NP_X_API_KEY || '',
    },
  }

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
    throw new Error('Failed to fetch data')
  }

  return res.json()
}


export const metadata: Metadata = {
  title: 'NPComlete Explore',
}

export default async function Page() {
  const parkData: ParkData[] = (await getParkData()).data;
  return (
    <>
      <h1 style={{textAlign:'center'}}>Explore all the parks!</h1>
      <ParkList parkData={parkData}></ParkList>
    </>
  )

}