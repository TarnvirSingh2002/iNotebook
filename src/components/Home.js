import Notes from './Notes'
function Home(props) {
  const {takeAlert}=props;
  return (
    <div className="container">
      <Notes takeAlert={takeAlert}/>
    </div>
  )
}

export default Home

