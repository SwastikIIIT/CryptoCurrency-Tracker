import React, { useEffect, useState } from 'react'
import { Layout, Select, Input, Button, Typography, Card, Spin, Divider } from "antd";
import { SwapOutlined, TransactionOutlined } from '@ant-design/icons';
import {useGetMainCryptosQuery} from "../services/cryptoMainApi";
import {useGetFrom_ToQuery} from "../services/cryptoMainApi";
import millify from 'millify';
import fiatList from '../helper/fiatList';

const { Content } = Layout;
const {Title}=Typography;
const CurrencyConverter = () => {
   const [amount,setAmount]=useState(0);
   const [fromCurrency,setFromCurrency]=useState();
   const [toCurrency,setToCurrency]=useState("");
   const [convertedAmount,setConvertedAmount]=useState("");
   const [isMobile, setIsMobile] = useState(false);
   useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
   const {data,isLoading,error}=useGetMainCryptosQuery();
   console.log(data);
   const {data:convertData,isLoading:isLoadingConvert,error:errorConvert}=useGetFrom_ToQuery({fromCurrency, toCurrency},
    { skip: !fromCurrency || !toCurrency });

  
   const optionCrypto=data?.map((item)=>({
            value:item.id,
            label:item.name,
            icon:item.image
   }));

 const fiatOption=fiatList.map((item)=>({
          value:item.value,
          label:item.label
 }));

 const handleConvert = () => {
  if (convertData && fromCurrency && toCurrency && amount) {
    const rate = convertData[fromCurrency]?.[toCurrency];
    if (rate) {
      setConvertedAmount((amount * rate));
    }
  }
};

console.log(fromCurrency,toCurrency);
const handleSwap = () => {

  if (fromCurrency && toCurrency) {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  
    setConvertedAmount("");
  }
};
// console.log(fromCurrency);
// console.log(toCurrency);

  return (
    <Layout className='layout' style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Content style={{ padding: "40px 20px" }}>
        <Card
          className="converter-container"
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
          }}
        >
          <Title level={2} style={{ textAlign: 'center', marginBottom: '24px', color: '#1890ff' }}>
            <TransactionOutlined style={{ marginRight: '10px' }} />
            Crypto & Fiat Currency Converter
          </Title>
          <Divider />

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <Spin size="large" />
              <Typography.Text style={{ display: 'block', marginTop: '16px' }}>Loading currency data...</Typography.Text>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '24px' }}>
                <Title level={4} style={{ marginBottom: '8px' }}>Amount</Title>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  size="large"
                  placeholder="Enter amount to convert"
                  prefix={<TransactionOutlined style={{ color: '#1890ff' }} />}
                  style={{ width: "100%", fontSize: '16px' }}
                />
              </div>

              <div className={`currency-fields-container ${isMobile ? 'mobile' : ''}`}>
                <div className='currency-field'>
                  <Title level={4} style={{ marginBottom: '8px' }}>From</Title>
                  <Select
                    showSearch
                    placeholder="Select source currency"
                    style={{ width: "100%" }}
                    size="large"
                    value={fromCurrency}
                    onChange={(value) => setFromCurrency(value)}
                    options={optionCrypto}
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </div>

                <Button
                  type="default"
                  icon={<SwapOutlined />}
                  onClick={handleSwap}
                  className={`swap-button ${isMobile ? 'mobile' : ''}`}
                />

                <div className='currency-field'>
                  <Title level={4} style={{ marginBottom: '8px' }}>To</Title>
                  <Select
                    showSearch
                    placeholder="Select target currency"
                    style={{ width: "100%" }}
                    size="large"
                    value={toCurrency}
                    onChange={(value) => setToCurrency(value)}
                    options={fiatOption}
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </div>
              </div>

              <Button
                type="primary"
                onClick={handleConvert}
                style={{
                  width: '100%',
                  height: '48px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginBottom: '24px'
                }}
                disabled={!fromCurrency || !toCurrency || !amount}
              >
                Convert Now
              </Button>

              <Divider />

              <div style={{ marginTop: '16px' }}>
                <Title level={4} style={{ marginBottom: '8px' }}>Converted Amount</Title>
                <Input
                  disabled
                  size="large"
                  style={{ 
                    width: "100%", 
                    backgroundColor: '#f0f7ff',
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    border: '1px solid #d9d9d9',
                    height: '48px'
                  }}
                  value={convertedAmount ? `${millify(convertedAmount)} ${toCurrency.toUpperCase()}` : ''}
                />
              </div>

              {errorConvert && (
                <Typography.Text type="danger" style={{ display: 'block', marginTop: '8px' }}>
                  Error fetching conversion data. Please try again.
                </Typography.Text>
              )}
            </>
          )}
        </Card>
      </Content>
    </Layout>
  );
}

export default CurrencyConverter