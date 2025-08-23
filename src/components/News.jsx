import React, { useState } from 'react'
import {useGetCryptosNewsQuery} from "../services/cryptoNewsApi";
import {useGetMainCryptosQuery} from "../services/cryptoMainApi";
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import { DateTime } from 'luxon';
import Loader from './Loader';


const { Text, Title } = Typography;
const { Option } = Select;
const News=({simplified}) => {
  
  // console.log("Simplified",simplified);
  const count=simplified?6:10;
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const {data,isLoading,error}=useGetCryptosNewsQuery(newsCategory);
  const {data:mainInfo,isLoading:loading}=useGetMainCryptosQuery();
  const news=data?.data;

  const staticOptions = [
    { value: 'Cryptocurrency', label: 'Cryptocurrency' },
  ];

  const dynamicOptions = mainInfo?.map((currency) => ({
    value: currency.name,
    label: currency.name,
  }));

  const options = [...staticOptions, ...(dynamicOptions || [])];

  const demoImage = './bitcoin.png';
  // console.log(news);
  // console.log("API Response:", data);
  console.log("News Articles:", news);

  if(isLoading)return <Loader/>
  return (
    <>
      <div className='selectTab'>
      {!simplified && 
         <Select 
           showSearch 
           className='select-news'
           placeholder="Select a crypto"
           options={options}
           onChange={(value) => setNewsCategory(value)}
           filterOption={(input, option) => 
           option.label.toLowerCase().includes(input.toLowerCase())
        }
         />
       }
       </div>


    <Row gutter={[24,24]}>

         {news?.slice(0,count)?.map((item,index)=>{
             return(
              <Col xs={24} sm={12} lg={8} key={index}>
                    <a href={item.url} target='_blank'>
                      <Card className='news-card' hoverable>
                              <div className='news-image-container'>
                                <Title className='news-title' level={5}>{item.title}</Title>
                                <div >
                                  <img style={{"height":"100%","maxWidth":"100px","maxHeight":"80px"}} 
                                     src={item.thumbnail} 
                                     alt={item?.date}
                                     onError={(e)=>e.target.src=`/btc.jpg`} 
                                   />
                                </div>
                              </div>
                              <p className='para'>{item.excerpt.length > 100 ? `${item.excerpt.substring(0, 100)}...` : item.excerpt}</p>
                          
                            <div className="provider-container">
                                <div>
                                  <Avatar 
                                    src={<img
                                      src={item?.publisher?.favicon || "/bitcoin.png"}
                                      onError={(e) => (e.target.src = "/bitcoin.png")}
                                      alt={item?.publisher?.name}
                                    />}
                                    alt={item?.publisher?.name} />
                                  <Text className="provider-name">{item?.publisher?.name}</Text>
                                </div>
                                <Text>{DateTime.fromISO(item.date).toRelative()}</Text>
                          </div>
                      </Card>
                   </a>
              </Col>)
         })}
    </Row>
    </>
  )
}

export default News;