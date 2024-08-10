import Notes from './Notes'
import { Navigate } from 'react-router-dom';
function Home(props) {
  const {takeAlert}=props;
  if(window.localStorage.getItem('token')){
  }
  else{
    return <Navigate to='/Login'/>
  }
  return (
    <div className="container">
      <Notes takeAlert={takeAlert}/>
    </div>
  )
}

export default Home