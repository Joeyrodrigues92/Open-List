import React from "react";

function Card(props) {
  return (
    <div onClick={() => props.handleCardClick()} style={{border:'solid' , borderWidth: '2px', display:'flex', flexDirection:'column', textAlign:'center', width:'300px'}}className="">
        <h2>
           {props.propertyState.streetAdd}, 
        </h2>
        <h3>
            {props.propertyState.cityAdd}, {props.propertyState.stateAdd}
        </h3>

        {/* <button>Close and Save List</button> */}
    </div>
  );
}

export default Card;