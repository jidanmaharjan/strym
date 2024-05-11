import { useQuery } from 'react-query';
import { getNewReleases } from '../queries/songs';
import Loader from './Loader';

const NewReleases = () => {
    const {
        data: newReleases,
        isLoading: newReleasesLoading,
        isFetching: newReleasesFetching,
      } = useQuery(["new_releases"], () => getNewReleases());


      if(newReleasesLoading){
        return <Loader />
      }
      
  return (
    <div>
        
        {newReleases?.albums?.items?.map((item: any) => (
        <div key={item.id}>
            <img src={item.images.filter((x: any)=>x.height === 300)[0].url} />
          {item.name} - {item.artists[0].name}
        </div>
      ))}
    </div>
  )
}

export default NewReleases