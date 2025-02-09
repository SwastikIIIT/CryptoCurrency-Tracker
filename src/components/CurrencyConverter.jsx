import React, { useState } from 'react'
import { Layout } from "antd";
import { Select, Input, Button, Typography } from "antd";
import {useGetMainCryptosQuery} from "../services/cryptoMainApi";
import {useGetFrom_ToQuery} from "../services/cryptoMainApi";
import fiatList from '../helper/fiatList';

const { Content } = Layout;
const {Title}=Typography;
const CurrencyConverter = () => {
   const [amount,setAmount]=useState(0);
   const [fromCurrency,setFromCurrency]=useState();
   const [toCurrency,setToCurrency]=useState("");
   const [convertedAmount,setConvertedAmount]=useState("");

   const {data,isLoading,error}=useGetMainCryptosQuery();
   const {data:convertData,isLoading:isLoadingConvert,error:errorConvert}=useGetFrom_ToQuery({fromCurrency, toCurrency},
    { skip: !fromCurrency || !toCurrency });

  
   const optionCrypto=data?.map((item)=>({
            value:item.id,
            label:item.name
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

// console.log(fromCurrency);
// console.log(toCurrency);

  return (
    <Layout className='layout'>
        <Content style={{ padding: "50px" }}>
        
        <div className="converter-container"style={{ padding: "20px" }}>
        <Title level={3}>Crypto & Fiat Currency Converter</Title>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ width: "200px", margin: "8px 6px 10px 0" }}
        />
        <Select
          showSearch
          placeholder="Enter the from currency"
          style={{ width: "200px", marginRight: "10px" }}
          onChange={(value) => setFromCurrency(value)}
          options={optionCrypto}
          filterOption={(input,optionCrypto)=>
            optionCrypto.label.toLowerCase().includes(input.toLowerCase())
          }
        />
          
        <span>to</span>
        <Select
          showSearch
          placeholder="Enter the to currency"
          style={{ width: "200px", marginRight: "10px" }}
          onChange={(value) => setToCurrency(value)}
          options={fiatOption}
          filterOption={(input,fiatOption)=>
            fiatOption.label.toLowerCase().includes(input.toLowerCase())
          }
        />
          
        <Button type="primary" onClick={handleConvert}>
          Convert
        </Button>

        <Title level={4} style={{ marginTop: "20px" }}>
          Converted Amount: {convertedAmount} {toCurrency.toUpperCase()}
        </Title>
      </div>
        </Content>
    </Layout>

  )
}

export default CurrencyConverter