import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card';

export default function Priority1(props) {
  const [data, setData] = useState(null);
  const [card_list_Urgent, setcard_list_Urgent] = useState([]);
  const [card_list_High, setcard_list_High] = useState([]);
  const [card_list_Medium, setcard_list_Medium] = useState([]);
  const [card_list_Low, setcard_list_Low] = useState([]);
  const [card_list_Nopriority, setcard_list_Nopriority] = useState([]);
  const [addCardExecuted, setAddCardExecuted] = useState(false); 

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
      setData(response.data.tickets);
    } catch (error) {
      console.error('Axios error:', error);
    }
  };

  const add_card = () => {
    const newcardlist_Urgent = [];
    const newcardlist_High = [];
    const newcardlist_Medium = [];
    const newcardlist_Low = [];
    const newcardlist_Nopriority = [];

    for (const item of data) {
      const card = <Card key={item.id} name={item.id} desc={item.title} tag={item.tag[0]} />;

      if (item.priority === 0) {
        newcardlist_Nopriority.push(card);
      } else if (item.priority === 1) {
        newcardlist_Low.push(card);
      } else if (item.priority === 2) {
        newcardlist_Medium.push(card);
      } else if (item.priority === 3) {
        newcardlist_High.push(card);
      } else if (item.priority === 4) {
        newcardlist_Urgent.push(card);
      }
    }

    setcard_list_Nopriority(newcardlist_Nopriority);
    setcard_list_Low(newcardlist_Low);
    setcard_list_Medium(newcardlist_Medium);
    setcard_list_High(newcardlist_High);
    setcard_list_Urgent(newcardlist_Urgent);
    setAddCardExecuted(true); 
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data && !addCardExecuted) { 
      add_card();
    }
  }, [data, addCardExecuted]);




//////////////// order by text ///////////////////

const sortArrayByDesc = (array) => {
  return [...array].sort((a, b) => {
    const descA = a.props.desc.toLowerCase();
    const descB = b.props.desc.toLowerCase();
    return descA.localeCompare(descB);
  });
};



  let sorted_Nopriority = [];
  let sorted_Urgent = [];
  let sorted_High = [];
  let sorted_Medium = [];
  let sorted_Low = [];


  if (props.order === 'Text') {
    sorted_Nopriority = sortArrayByDesc(card_list_Nopriority);
    sorted_Urgent = sortArrayByDesc(card_list_Urgent);
    sorted_High = sortArrayByDesc(card_list_High);
    sorted_Medium = sortArrayByDesc(card_list_Medium);
    sorted_Low = sortArrayByDesc(card_list_Low);
  }


/////////////////////////////////////////////////
else 
{

sorted_Nopriority = (card_list_Nopriority);
    sorted_Urgent = (card_list_Urgent);
    sorted_High = (card_list_High);
    sorted_Medium = (card_list_Medium);
    sorted_Low = (card_list_Low);
  




}








  return (
    <div style={{ display: 'flex', backgroundColor: 'rgb(211, 225, 230)', height: '100vh',overflowY: "auto" }}>
      <div style={{ width: '20%' }}><div style={{display:"flex" ,position:"relative"}}><div style={{marginLeft:"12px"}}>No priority</div><div style={{position:"relative",marginLeft:"15px"}}>{card_list_Nopriority.length}</div></div>{sorted_Nopriority}</div>
      <div style={{ width: '20%' }}><div style={{display:"flex",position:"relative"}}><div style={{marginLeft:"12px"}}>Urgent</div><div style={{position:"relative",marginLeft:"15px"}}>{card_list_Urgent.length}</div></div>{sorted_Urgent}</div>
      <div style={{ width: '20%' }}><div style={{display:"flex",position:"relative"}}><div style={{marginLeft:"12px"}}>High</div><div style={{position:"relative",marginLeft:"15px"}}>{card_list_High.length}</div></div>{sorted_High}</div>
      <div style={{ width: '20%' }}><div style={{display:"flex",position:"relative"}}><div style={{marginLeft:"12px"}}>Medium</div><div style={{position:"relative",marginLeft:"15px"}}>{card_list_Medium.length}</div></div>{sorted_Medium}</div>
      <div style={{ width: '20%' }}><div style={{display:"flex",position:"relative"}}><div style={{marginLeft:"12px"}}>Low</div><div style={{position:"relative",marginLeft:"15px"}}>{card_list_Low.length}</div></div>{sorted_Low}</div>
    </div>
  );
}


