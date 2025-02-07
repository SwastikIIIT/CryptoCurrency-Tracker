import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoAPI';
import { Link } from 'react-router-dom';
import Cryptocurrencies from './Cryptocurrencies';
import CryptoDetails from './CryptoDetails';
import News from './News';
import { useGetMainCryptosQuery  } from '../services/cryptoMainApi';

const { Title } = Typography;

const Homepage = () => {
  const { data,error,isLoading } = useGetCryptosQuery();
  const globalStats = data?.data?.stats;
  if(isLoading)return <h1>Loading........</h1>

  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats?.total} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={globalStats?.exchanges} /></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats?.totalMarketCap)} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats?.total24hVolume)} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globalStats?.totalMarkets)} /></Col>
      </Row>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
        <Title level={3} className='show-more'><Link to="/cryptocurrencies">Show More</Link></Title>
      </div>
      <Cryptocurrencies simplified/>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Latest Crypto News</Title>
        <Title level={3} className='show-more'><Link to="/cryptocurrency">Show More</Link></Title>
      </div>
      <News simplified/>
    </>
  );
};

export default Homepage;




