import { useQuery } from 'react-query';
import { getNewReleases } from '../queries/songs';
import { Tabs, TabsProps } from 'antd';
import { MdOutlineNewReleases } from 'react-icons/md';
import { TbCategory } from 'react-icons/tb';

const NewReleases = () => {
    const {
        data: newReleases,
        isLoading: newReleasesLoading,
        isFetching: newReleasesFetching,
      } = useQuery(["new_releases"], () => getNewReleases());

      
  return (
    <div>
        
        {newReleases?.albums?.items?.map((item: any) => (
        <div>
          {item.name} - {item.artists[0].name}
        </div>
      ))}
    </div>
  )
}

export default NewReleases