import React from 'react';
import Card from './Card';


export default function Div(props) {
  const user_name = props.map[props.user_id];


const tickets_data=props.ticket_data;
console.log(tickets_data)

const card_array=[]

for(const i of tickets_data)
{
if(i.userId===props.user_id)
{
    card_array.push(<Card name={i.id} desc={i.title} tag={i.tag[0]} priority={i.priority} ></Card>)
}
}

// console.log("props.user_id",props.user_id)



//////////////////// priority ///////////////

console.log("div me order",props.order)

if(props.order==='Priority'){

console.log("prorty")
   card_array.sort((a, b) => {
    
    const priorityA = a.props.priority;
    const priorityB = b.props.priority;
    return priorityA - priorityB;
  });
}


//////////////////// Text  //////////////////

else if(props.order==='Text')
{
console.log("props.order(tuxt)",props.order)
card_array.sort((a, b) => {
  const descA = a.props.desc.toLowerCase();
  const descB = b.props.desc.toLowerCase();

  if (descA < descB) {
    return -1;
  }
  if (descA > descB) {
    return 1;
  }
  return 0;
});







}





///////////////////////////////////////////////

  return (
    <div  id={`${props.user_id}`} style={{ width: `${100 / Object.keys(props.map).length }%` }}>
    
    <div style={{display:"flex",position:"relative"}}>
     <div style={{marginLeft:"19px"}}> {user_name}</div>  <div style={{marginLeft:"23px"}}>{card_array.length}</div>
    </div>
    
    <div>
     {/* <Card></Card> */}
    

    {card_array}

    </div>
    
    
    
    </div>
  );
}
