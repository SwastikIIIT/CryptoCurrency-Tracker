import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoAPI';

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching, error } = useGetCryptosQuery();
  const globalStats = data?.data;

  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats?.totalCoins} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={globalStats?.totalExchanges} /></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats?.totalMarketCap)} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats?.total24hVolume)} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={globalStats?.totalMarkets} /></Col>
      </Row>
    </>
  );
};

export default Homepage;




