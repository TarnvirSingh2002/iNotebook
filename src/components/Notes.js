import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import NoteItems from './NoteItems';
import AddNote from './AddNote';
function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getNotes, editNode } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
  }, [])
  const {takeAlert}=props;

  const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });

  const handleclicks=(e)=>{
    editNode(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    takeAlert("Updated successfully", "Success");
  }

  const updatenote = (currentNote) => {
    ref.current.click();
    setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  }
  const ref = useRef(null);
  const refClose = useRef(null);
  return (
    <>
      <AddNote takeAlert={takeAlert}/>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='container my-3'>
                <h2>Add a note</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" value={note.etitle} name="etitle" id="etitle" aria-describedby="emailHelp"
                      onChange={onchange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onchange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onchange} />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" disabled={note.etitle.length<4 || note.edescription.length<5 } onClick={handleclicks} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className=' row my-3'>
        <h2>Your notes</h2>
        <div className='container'>
        {notes.length===0 && 'NO NOTES TO DISPLAY'} {/* if there is noting in else then we use && in the ternery operator */}
        </div>
        {notes.map((not) => {
          return <NoteItems key={not._id} takeAlert={takeAlert} updatenote={updatenote} note={not} />
        })}
      </div>
    </>
  )
}

export default Notes
