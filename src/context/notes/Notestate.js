import { useState } from "react";
import noteContext from "./NoteContext"; 
const NoteState =(props)=>{
  const host="http://localhost:5000";
    const notesInitials=[];
      const [notes, setNotes] =useState(notesInitials);

      //get all notes 
      const getNotes = async()=>{

        const response= await fetch(`${host}/api/nodes/fetchallnotes`,{
          method:"GET",
          headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
            // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhZGQzZDZmNmE4OGM3Yzc0MjZjMDM1In0sImlhdCI6MTcyMjY3MzU5Nn0.XJuFfv-d44qGIHLumTa65DoM0QtJIEkdYzPW99PW1-E'
          }
        });
          const json= await response.json();
          setNotes(json);
      }

      //Adding a note 
      const addNote = async(title,description, tag)=>{

        const response= await fetch(`${host}/api/nodes/addnote`,{
          method:"POST",
          headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
            // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhZGQzZDZmNmE4OGM3Yzc0MjZjMDM1In0sImlhdCI6MTcyMjY3MzU5Nn0.XJuFfv-d44qGIHLumTa65DoM0QtJIEkdYzPW99PW1-E'

          },
          body:JSON.stringify({title, description, tag})
        });
        const note= await response.json();
        setNotes(notes.concat(note));       
      }

      //Deleting a note
      const deleteNode = async (id)=>{

        const response= await fetch(`${host}/api/nodes/deletenote/${id}`,{
          method:"DELETE",
          headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
            // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhZGQzZDZmNmE4OGM3Yzc0MjZjMDM1In0sImlhdCI6MTcyMjY3MzU5Nn0.XJuFfv-d44qGIHLumTa65DoM0QtJIEkdYzPW99PW1-E'

          }
          });
          const json= await response.json();
          setNotes(json);

          const newNod= notes.filter((not)=>{return not._id!==id})
          setNotes(newNod);
      }

      //Edit node
      const editNode = async(id, title, description, tag)=>{
        //API call
        const response= await fetch(`${host}/api/nodes/updatenote/${id}`,{
          method:"PUT",
          headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
            // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhZGQzZDZmNmE4OGM3Yzc0MjZjMDM1In0sImlhdCI6MTcyMjY3MzU5Nn0.XJuFfv-d44qGIHLumTa65DoM0QtJIEkdYzPW99PW1-E'

          },
          body:JSON.stringify({title, description,tag})
        });

        let newNotes=JSON.parse(JSON.stringify(notes))
        
        //Logic to edit 
        for(let index=0; index<notes.length; index++){
          const element= notes[index];
          if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            // break;
          }
        }
        setNotes(newNotes);
      }
    return (
        <noteContext.Provider value={{notes, addNote, deleteNode, editNode, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )

}
export default NoteState;