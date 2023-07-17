import { Metadata } from 'next';
import ParkList from '../../components/parkList';
import { ParkData } from '@/app/_data/parkDataInterface';
import { getActivityData, getParkData } from '@/app/_data/npsAPIRequests';
import styles from '../page.module.css';
import { FiltersProvider } from '@/app/components/filters/filterStateProvider';
import { Activity } from '@/app/_data/activitiesDataInterface';


export const metadata: Metadata = {
  title: 'NPComlete Explore',
}

export default async function Page() {
  const parkData: ParkData[] = (await getParkData()).data;

  const activityData: Activity[] = (await getActivityData()).data;


  // const actMap:{[key:string]:string} = {};

  // parkData.map((d:ParkData) => {
  //   d.activities.map((act: Activity) => {
  //     actMap[act.id] = act.name;
  //   })
  // })

  // Object.entries(actMap)
  // .sort(([x,a],[y,b]) => a.localeCompare(b))
  // .map(([id, name]) => {
  //   console.log('"' + id + '"' + ': "' + name + '",')
  // })

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Explore all the parks!</h1>
      <FiltersProvider>
        <ParkList parkData={parkData} activityData={activityData}></ParkList>
      </FiltersProvider>
    </>
  )

}