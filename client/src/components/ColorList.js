import React, { useState } from "react";
import {axiosWithAuth}  from '../Utils';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
      // Make a put request to save your updated color
      // think about where will you get the id from...
      // where is it saved right now?
      axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      
      .catch(error => console.log(error.response))
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    
    .catch(error =>console.log(error.res))
    window.location.reload()

  };

  // const addColor = color ={
  //   axiosWithAuth()
  //   .post('http://localhost:5000/api/colors/')
  // }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                Delete
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};




// const LoginForm = ({touched, errors}) => {
//   // make a post request to retrieve a token from the api
//    // when you have handled the token, navigate to the BubblePage route
  
//    return (
//        <div className='login-form'>
//            <form>
//                <input 
//                    className='username'
//                    type= 'text'
//                    name= 'username'
//                    placeholder ='Username'
//                />
//                {touched.username && errors.username && (
//                    <p className= 'error'>{errors.username}</p>
//                )}
//                <input 
//                    className='password'
//                    type= 'password'
//                    name= 'password'
//                    placeholder ='Password'
//                />
//                {touched.password && errors.password && (
//                    <p className= 'error'>{errors.password}</p>
//                )}
//              <button type ='submit'>Add</button>
//            </form>


// handleSubmit(addBubble){
//   axios
//   .post('http://localhost:5000/api/login', addBubble)
//   .then(res => {
//       console.log(res)
//       localStorage.setItem('token', res.data.payload)
//       formikBag.props.history.push('/BubblesPage')
//   })
//   .catch(error => console.log(error.res))
// }

export default ColorList;
