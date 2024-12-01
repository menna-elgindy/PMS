import Dropdown from 'react-bootstrap/Dropdown';

interface tableActionsData {
  categoryName : string ,
  handleShow : () => void ,
  handleShowEdit : () => void,
  handleShowDelete : ()=>void

}


const TableActions : React.FC<tableActionsData> = ({categoryName,handleShow,handleShowEdit,handleShowDelete})=> {
  





    

 return <>
   <div className="cursorPointer">
    
  <Dropdown>
      <Dropdown.Toggle variant='transparent'  id="dropdown-basic">
      <i className="fa-solid fa-ellipsis-vertical tableHeaderIcon fa-2x"></i>      <span className='sr-only'>click to toggle menu</span>

      </Dropdown.Toggle>

      <Dropdown.Menu>
     
      <Dropdown.Item  onClick={()=>{handleShow()}}> <i className="fa-solid fa-eye option-icons"></i>View
        
        <span className='sr-only'>click to view category {categoryName}</span>
        </Dropdown.Item>
      <Dropdown.Item  onClick={()=>{handleShowEdit()}}><i className="fa-solid fa-pen-to-square option-icons " ></i>Edit
        
        <span className='sr-only'>click to edit category {categoryName}</span>
        </Dropdown.Item>

 
        <Dropdown.Item  onClick={()=>{handleShowDelete()}}><i className="fa-solid fa-trash-can option-icons"></i>Delete
        
        <span className='sr-only'>click to delete category {categoryName}</span>
        </Dropdown.Item>
         
      </Dropdown.Menu>
    </Dropdown>

  </div>
 
 </>
}
export default TableActions