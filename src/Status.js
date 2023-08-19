import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card';

export default function Status(props) {
  const [data, setData] = useState(null);
  const [card_list_Backlog, setcard_list_Backlog] = useState([]);
  const [card_list_Todo, setcard_list_Todo] = useState([]);
  const [card_list_Inprogress, setcard_list_Inprogress] = useState([]);
  const [card_list_Done, setcard_list_Done] = useState([]);
  const [card_list_Cancelled, setcard_list_Cancelled] = useState([]);
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
    const newcardlist_Backlog = [];
    const newcardlist_Todo = [];
    const newcardlist_Inprogress = [];
    const newcardlist_Done = [];
    const newcardlist_Cancelled = [];

    for (const item of data) {
      const card = <Card key={item.id} name={item.id} desc={item.title} tag={item.tag[0]} priority={item.priority} />;

      if (item.status === 'Backlog') {
        newcardlist_Backlog.push(card);
      } else if (item.status === 'Todo') {
        newcardlist_Todo.push(card);
      } else if (item.status === 'In progress') {
        newcardlist_Inprogress.push(card);
      } else if (item.status === 'Done') {
        newcardlist_Done.push(card);
      } else if (item.status === 'Cancelled') {
        newcardlist_Cancelled.push(card);
      }
    }

    setcard_list_Backlog(newcardlist_Backlog);
    setcard_list_Todo(newcardlist_Todo);
    setcard_list_Inprogress(newcardlist_Inprogress);
    setcard_list_Done(newcardlist_Done);
    setcard_list_Cancelled(newcardlist_Cancelled);
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

  const sortArrayByPriority = (array) => {
    return [...array].sort((a, b) => {
      const priorityA = a.props.priority;
      const priorityB = b.props.priority;
      return priorityA - priorityB;
    });
  };
  
  const sortArrayByDesc = (array) => {
    return [...array].sort((a, b) => {
      const descA = a.props.desc.toLowerCase();
      const descB = b.props.desc.toLowerCase();
      return descA.localeCompare(descB);
    });
  };
  
  let sorted_Backlog = [];
  let sorted_Todo = [];
  let sorted_Inprogress = [];
  let sorted_Done = [];
  let sorted_Cancelled = [];

  if (props.order === 'Text') {
    sorted_Backlog = sortArrayByDesc(card_list_Backlog);
    sorted_Todo = sortArrayByDesc(card_list_Todo);
    sorted_Inprogress = sortArrayByDesc(card_list_Inprogress);
    sorted_Done = sortArrayByDesc(card_list_Done);
    sorted_Cancelled = sortArrayByDesc(card_list_Cancelled);
  }
  
  else if (props.order === 'Priority') {
    sorted_Backlog = sortArrayByPriority(card_list_Backlog);
    sorted_Todo = sortArrayByPriority(card_list_Todo);
    sorted_Inprogress = sortArrayByPriority(card_list_Inprogress);
    sorted_Done = sortArrayByPriority(card_list_Done);
    sorted_Cancelled = sortArrayByPriority(card_list_Cancelled);
  }

  return (
    <div style={{ display: 'flex', backgroundColor: 'rgb(211, 225, 230)', height: '140vh', overflowY: 'auto' }}>
      <div style={{ width: '20%' }}>
        <div style={{ display: 'flex',position:"relative" }}><div style={{marginLeft:"12px"}}>Backlog</div><div style={{ position: 'relative', marginLeft: '15px' }}>{sorted_Backlog.length}</div></div>
        {sorted_Backlog}
      </div>
      <div style={{ width: '20%' }}>
        <div style={{ display: 'flex',position:"relative" }}><div style={{marginLeft:"12px"}}>Todo</div><div style={{ position: 'relative', marginLeft: '15px' }}>{sorted_Todo.length}</div></div>
        {sorted_Todo}
      </div>
      <div style={{ width: '20%' }}>
        <div style={{ display: 'flex',position:"relative" }}><div style={{marginLeft:"12px"}}>In progress</div><div style={{ position: 'relative', marginLeft: '15px' }}>{sorted_Inprogress.length}</div></div>
        {sorted_Inprogress}
      </div>
      <div style={{ width: '20%' }}>
        <div style={{ display: 'flex',position:"relative" }}><div style={{marginLeft:"12px"}}>Done</div><div style={{ position: 'relative', marginLeft: '15px' }}>{sorted_Done.length}</div></div>
        {sorted_Done}
      </div>
      <div style={{ width: '20%' }}>
        <div style={{ display: 'flex',position:"relative" }}><div style={{marginLeft:"12px"}}>Cancelled</div><div style={{ position: 'relative', marginLeft: '15px' }}>{sorted_Cancelled.length}</div></div>
        {sorted_Cancelled}
      </div>
    </div>
  );
}
