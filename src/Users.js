import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Div from './components/Div';

export default function Users(props) {
  const [users_data, setusers_data] = useState(null);
  const [ticket_data, setticket_data] = useState(null)
  const [rendered_once, setrendered_once] = useState(false)

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
      setusers_data(response.data.users);
      setticket_data(response.data.tickets);
      setrendered_once(true);
    } catch (error) {
      console.error('Axios error:', error);
    }  
  };
  
 
  const user_name_assign = () => {
    console.log('user_nsme_assign')
    const map = {};
    const new_user_id = [];

    for (const i of users_data) {
      new_user_id.push(i.id);
      map[i.id] = i.name;
    }

 

    const list_of_divs = new_user_id.map((user_id) => (
      <Div map={map} key={user_id} user_id={user_id} ticket_data={ticket_data} order={props.order}/>
    ));

    return list_of_divs;
  };



  useEffect(() => {
    fetchData();
  }, []);


//   useEffect(()=>{

// if(users_data && !rendered_once)

// user_name_assign()



//   },[users_data,rendered_once])



console.log("props.order->",props.order)



  return (
  <div style={{display:"flex",backgroundColor: 'rgb(211, 225, 230)',overflowY: "auto",height:"100vh" }}>{
    
    
    users_data && user_name_assign()
  
  
  
  }</div>
  
  
  
  
  
  
  );






}
