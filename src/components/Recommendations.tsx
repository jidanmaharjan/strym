import { useQuery } from 'react-query'
import { callAxios } from '../hooks/useAxios'

const Recommendations = () => {
    const {data, isLoading, isFetching} = useQuery(['recommendation-tracks'], ()=>callAxios({
        url: 'recommendtaions',
        params: {limit: 10,}
    }))
  return (
    <div>
        {data?.data?.map((track: any)=>(
            <div>
                {JSON.stringify(track)}
            </div>
        ))}
    </div>
  )
}

export default Recommendations