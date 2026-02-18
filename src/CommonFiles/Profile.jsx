
import { useStore } from '../../public/StoreContext';



function Profile() {

  const {setOpen, setOpens} = useStore()
    

const user = JSON.parse(localStorage.getItem("USER"))
  if (!user) return <p>No user data</p>;

    return (
        <div  className='border flex items-center gap-30'>
        <img className='w-90' src="https://cdn-icons-png.flaticon.com/512/9203/9203764.png" alt="" />
      <div>
          <p>Email : <span className='text-black'>{user.email}</span> <i className="fa-regular fa-pen-to-square text-red-800 fa-xl px-5 pb-5 transition transform hover:scale-115" onClick={()=> {  setOpen(true)  }}></i></p>
        <p>Password : <span className='text-black'>{user.password}</span> <i className="fa-regular fa-pen-to-square text-red-800 fa-xl px-18 transition transform hover:scale-115" onClick={()=> {  setOpens(true)  }}></i></p>
      </div>
        </div>
  )
}

export default Profile