import React, { useEffect, useState } from 'react';
import millify from 'millify';
import {Row,Col,Input,Card} from "antd"
import { Link } from 'react-router-dom';
import { useGetMainCryptosQuery  } from '../services/cryptoMainApi';

const Cryptocurrencies = ({simplified}) => {
   const count=simplified?10:50;
   const {data,isLoading,error}=useGetMainCryptosQuery ();

   const [coins,setCoins]=useState([]);
   const [searchTerm,setSearchTerm]=useState('');
  //  console.log(data);
   
   useEffect(()=>{
      let newData;
      if(data)
      {
       newData=data.slice(0,count).filter((item)=>(
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ))
      }
     setCoins(newData);
    }
     ,[data,searchTerm]);
  
   if(isLoading)return <h1>Loading........</h1>

  return (
    <>
      {!simplified && 
      <div className='search-crypto'>
          <Input placeholder='Search Cryptocurrency..' onChange={(e)=>setSearchTerm(e.target.value)}></Input>
      </div>
      }
      <Row gutter={[32,32]} className='crypto-card-container'>
      {coins?.map((item)=>(
        <Col xs={24} sm={12} lg={6} key={item?.id} className='crypto-card'>
         <Link to={`/crypto/${item?.id}`}>
          <Card title={`${item?.market_cap_rank}. ${item?.name}`} extra={<img className='crypto-image'  src={item?.image}/>} bordered={false} hoverable>
            <p>Price: {millify(item?.current_price)}</p>
            <p>Market Cap: {millify(item?.market_cap)}</p>
            <p>Daily Change: {millify(item?.price_change_percentage_24h)}</p>
          </Card>
          </Link>
        </Col>
      ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies