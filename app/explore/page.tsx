import { Metadata } from 'next'
import { ParkData } from './parkDataInterface'
import ParkList from '../components/parkList'
import styles from '../page.module.css'


async function getParkData(): Promise<{ data: ParkData[] }> {
  const requestOptions = {
    method: 'GET',
    headers: {
      'x-api-key': process.env.NP_X_API_KEY || '',
    },
  }
  const res = await fetch('https://developer.nps.gov/api/v1/parks?limit=470', requestOptions)

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