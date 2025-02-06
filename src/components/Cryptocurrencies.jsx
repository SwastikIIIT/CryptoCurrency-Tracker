import React, { useEffect, useState } from 'react';
import millify from 'millify';
import {Row,Col,Input,Card} from "antd"
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoAPI';

const Cryptocurrencies = ({simplified}) => {
   const count=simplified?10:50;
   const {data,isLoading,error}=useGetCryptosQuery(count);
   const [coins,setCoins]=useState(data?.data?.coins);
   const [searchTerm,setSearchTerm]=useState('');
   
   useEffect(()=>{
     
     const newData=data?.data?.coins.filter((item)=>(
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
     ))
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
         <Link to={`/cryptoCoin/${item?.rank}`}>
          <Card title={`${item?.rank}. ${item?.name}`} extra={<img className='crypto-image'  src={item?.iconUrl}/>} bordered={false} hoverable>
            <p>Price: {millify(item?.price)}</p>
            <p>Market Cap: {millify(item?.marketCap)}</p>
            <p>Daily Change: {millify(item?.change)}</p>
          </Card>
          </Link>
        </Col>
      ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies