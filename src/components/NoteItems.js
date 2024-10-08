import React,{useContext} from 'react'
import noteContext from '../context/notes/NoteContext';
function NoteItems(props) {
    const {note, updatenote, takeAlert} = props;
    const context = useContext(noteContext);
    const { deleteNode } = context;
    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description} </p>
                        <i className="fa-solid fa-trash mx-2" style={{cursor:"pointer"}} onClick={()=>{deleteNode(note._id); takeAlert("Deleted successfully", "Success")}}></i>
                        <i className="fa-solid fa-pen-to-square mx-3" style={{cursor:"pointer"}} onClick={()=>{updatenote(note)}}></i>
                    </div>
            </div>           
        </div>
    )
}
export default NoteItems
