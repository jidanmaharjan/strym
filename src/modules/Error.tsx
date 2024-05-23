import error from '../assets/error.png'

const Error = () => {
  return (
    <div className='w-full h-screen flex flex-col gap-4 font-semibold justify-center items-center'>
        <img src={error} className='w-fit h-fit' alt="error" />
        <h3>404 Not Found</h3>
    </div>
  )
}

export default Error