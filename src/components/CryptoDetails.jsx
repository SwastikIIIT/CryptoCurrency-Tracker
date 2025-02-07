import React from 'react'
import {Row,Col,Typography,Select} from "antd";
import { useParams } from 'react-router-dom';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser/lib/index';
import {useGetAdditionalCryptosQuery} from "../services/cryptoMainApi";
import {useGetCryptoInfoQuery} from "../services/geminiAPI";
import { RiseOutlined,MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { Space } from "antd";
import { Divider } from 'antd';
const{Title,Text}=Typography;

const CryptoDetails = () => {

  const {coinID}=useParams();
  const {data:dataStats,isLoading:isLoadingStats,error:errorStats}=useGetAdditionalCryptosQuery(coinID);
  const {data:dataGemini,isLoading:isLoadingGemini,error:errorGemini}=useGetCryptoInfoQuery(coinID);
  const info=dataStats?.[0];
  console.log(dataGemini);
  // console.log(dataGemini?.inflation);
  
  // console.log(info);
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

  if(isLoadingStats || isLoadingGemini)return <h1>Loading....</h1>
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
      {/* Line Chart */}
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {info?.name} Value Statistics
            </Title>
            <p>An overview showing the stats of {info?.name}</p>
          </Col>

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

     <Col className='coin-desc-link'>
      <Row className='coin-desc'>    
        <Title level={3} className='coin-details-heading'>What is {info?.name}?</Title>
        <Text>{dataGemini?.aboutCrypto}</Text>
        <Divider />
       
        <Title level={3} className='coin-details-heading'>Why does {info?.name} have value?</Title>
        <Text>{dataGemini?.itsValue}</Text>
      
        <Title level={3} className='coin-details-heading'>No inflation in {info?.name}</Title>
        <Text>{dataGemini?.inflation}</Text>
        
        <Title level={3} className='coin-details-heading'>Who built {info?.name}?</Title>
        <Text>{dataGemini?.whobuilt}</Text>
        
        <Title level={3} className='coin-details-heading'>The technology of {info?.name}</Title>
        <Text>{dataGemini?.technology}</Text>
      </Row>
      <Col className='coin-links'>
          <Title className='coin-details-heading'>
            {info?.name} Links
          </Title>
      </Col>
     </Col>
     </Col>
  )
}

export default CryptoDetails