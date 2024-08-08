import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/NoteContext';
function AddNote(props) {
    const{takeAlert}=props;
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setnote]=useState({title:"", description:"", tag:""})
    const handleclicks=(e)=>{
      e.preventDefault();
      addNote( note.title, note.description, note.tag);
      setnote({title:"", description:"", tag:""});
      takeAlert("Added successfully", "Success");
    }
    const onchange= (e)=>{
      setnote({...note,[e.target.name]:e.target.value});      
    }
  return (
    <div className='container mt-5 '>
      <div className='container my-2'>
        <h2>Add a note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" value={note.title}className="form-control" name="title" id="title" aria-describedby="emailHelp" 
            onChange={onchange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" value={note.description}className="form-control" id="description" name="description" onChange={onchange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" value={note.tag}className="form-control" id="tag" name="tag" onChange={onchange}/>
          </div>
          <button type="submit" disabled={note.title.length<4 || note.description.length<5 } className="btn btn-success" onClick={handleclicks}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
