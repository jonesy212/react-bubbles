import React, { useState, useEffect } from "react";
import axiosWithAuth from "../Utils";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
   // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const [colorList, setColorList] = useState([]);
  
  useEffect(() => {
  const fetchData = async () => {
    const result = axiosWithAuth.get('http://localhost:5000/api/colors')
    
    setColorList(result.data)
  };
    fetchData();

  }, [])
 
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
