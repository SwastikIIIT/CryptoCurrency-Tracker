import React, { useState } from 'react'
import {Row,Col,Typography,Select} from "antd";
import { useParams } from 'react-router-dom';
import millify from 'millify';
import {useGetAdditionalCryptosQuery} from "../services/cryptoMainApi";
import {useGetCryptoInfoQuery} from "../services/geminiAPI";
import  {useGetUrlInfoQuery} from "../services/geminiUrlApi";
import { RiseOutlined,MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Space } from "antd";
import { Divider } from 'antd';
import LineChart from './LineChart';
import Loader from './Loader';
const{Title,Text}=Typography;

const CryptoDetails = () => {

  const {coinID}=useParams();
  const [yAxis,setyAxis]=useState("prices");
  const {data:dataStats,isLoading:isLoadingStats,error:errorStats}=useGetAdditionalCryptosQuery(coinID);
  const {data:dataGemini,isLoading:isLoadingGemini,error:errorGemini}=useGetCryptoInfoQuery(coinID);
  const {data:dataUrl,isLoading:isLoadingUrl,error:errorUrl}=useGetUrlInfoQuery(coinID);
  const info=dataStats?.[0];
  
  // console.log(dataUrl);


  const stats = [
    { title: 'Price to USD', value: `$${millify(info?.current_price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: millify(info?.market_cap_rank), icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$${millify(info?.total_volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$${millify(info?.market_cap)}`, icon: <DollarCircleOutlined /> },
    { title: '24h high', value: `$${millify(info?.high_24h)}`, icon: <RiseOutlined /> },
  ];

  const genericStats = [
    { title: 'Market Cap Change', value: `$${millify(info?.market_cap_change_24h)}`, icon: <FundOutlined /> },
    { title: 'Price change 24h', value: `$${millify(info?.price_change_24h)}`, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value:<CheckOutlined />, icon:<ExclamationCircleOutlined/> },
    { title: 'Total Supply', value: `$${millify(info?.total_supply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$${millify(info?.circulating_supply)}`, icon: <ExclamationCircleOutlined /> },
  ];

  const  links=[
    {id:1,title:"Wikipedia",url:dataUrl?.wiki,dest:`wiki/${info?.name}`},
    {id:2,title:"Youtube",url:dataUrl?.youtube,dest:"youtube.com"},
    {id:3,title:"Github",url:dataUrl?.github,dest:"github.com"},
    {id:4,title:"Reddit",url:dataUrl?.reddit,dest:`r/${info?.name}`},
    {id:5,title:"Investopedia",url:dataUrl?.investopedia,dest:"investopedia.com"},
    {id:6,title:"Twitter",url:dataUrl?.twitter,dest:"x.com"},
    {id:7,title:"Coindesk",url:dataUrl?.coindesk,dest:"coindesk.com"},
    {id:8,title:`${info?.name}Image`,url:dataUrl?.image,dest:`${info?.name} image`},
  ]

//  console.log(links);
  console.log(yAxis);
  if( isLoadingGemini)return <Loader></Loader>
  return (
     <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
          <Title level={2} className='coin-name'>
            {info?.name} ({info?.symbol})Price
          </Title>
          <p>{info?.name} live price in USD dollars.
          View value statistics,market cap and supply</p>
      </Col>

      {/* Adding a select field and option */}
      <div className='select-timeperiod'>
        <Select 
        defaultValue="prices"
          onChange={(value)=>setyAxis(value)}
          options={[
          {
            value: 'prices',
            label: 'Price History',
          },
          {
            value: 'market_caps',
            label: 'Market Capital History',
          },
          {
            value: 'total_volumes',
            label: 'Total Volume History',
          },
            ]}
          placeholder="Select the data for y axis"/>
        </div>
      <LineChart coinID={coinID} yAxis={yAxis}/>

      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {info?.name} Value Statistics
            </Title>
            <p>An overview showing the stats of {info?.name}</p>
          </Col>
   
   {/* statistical data */}
          {stats.map(({title,icon,value})=>(
               <Col className='coin-stats'>
                 <Col className='coin-stats-name'>
                 <Text>{icon}</Text>
                 <Text>{title}</Text>
                 </Col>     
                 <Text className='stats'>{value}</Text>
              </Col>     
          ))}
        </Col>

        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              Other Statistics
            </Title>
            <p>An overview showing important statistical data</p>
          </Col>

          {genericStats.map(({title,icon,value})=>(
               <Col className='coin-stats'>
                 <Col className='coin-stats-name'>
                 <Text>{icon}</Text>
                 <Text>{title}</Text>
                 </Col>     
                 <Text className='stats'>{value}</Text>
              </Col>     
          ))}
        </Col>
      </Col>

{/* more info about cryptocurrency */}
     <Col className='coin-desc-link'>
      <Row className='coin-desc'>    
        <Title level={3} className='coin-details-heading'>What is {info?.name}?</Title>
        <Text strong>{dataGemini?.aboutCrypto}</Text>
        <Divider />
        
        <Title level={3} className='blck'>Team and Development</Title>
        <Text>{dataGemini?.whobuilt}</Text>
       
        <Title level={3} className='blck'>Ecosystem  of {info?.name}</Title>
        <Text>{dataGemini?.ecosystem}</Text>
      
        <Title level={3} className=' blck'>The technology of {info?.name}</Title>
        <Text>{dataGemini?.technology}</Text>

        <Title level={3} className=' blck'>Use Cases of {info?.name}</Title>
        <Text>{dataGemini?.useCases}</Text>
        
      </Row>

      {/* links of cryptocurrency */}
      <Col className='coin-links'>
          <Title level={3} className='blck'>
            {info?.name} Links
          </Title>
           {links.map((item)=>{
            return (
            <Row className="coin-link" key={item.id}>
              <Title level={5}>
                {item.title}
              </Title>
              <a href={item.url} target='_blank' rel="noreferrer">{item.dest}</a>
            </Row>)
           })}
          

      </Col>
     </Col>
     </Col>
  )
}

export default CryptoDetails