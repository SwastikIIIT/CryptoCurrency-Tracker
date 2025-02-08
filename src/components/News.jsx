import React, { useState } from 'react'
import {useGetCryptosNewsQuery} from "../services/cryptoNewsApi";
import {useGetMainCryptosQuery} from "../services/cryptoMainApi";
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

const { Text, Title } = Typography;
const { Option } = Select;
const News = ({simplified}) => {

  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const count=simplified?6:10;
  const {data,isLoading,error}=useGetCryptosNewsQuery(newsCategory);
  const {data:mainInfo,isLoading:loading}=useGetMainCryptosQuery();
  const news=data?.data;

  const staticOptions = [
    { value: 'Cryptocurrency', label: 'Cryptocurrency' }, // Static option
  ];

  const dynamicOptions = mainInfo?.map((currency) => ({
    value: currency.name,
    label: currency.name,
  }));

  const options = [...staticOptions, ...(dynamicOptions || [])];

  const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
  console.log(news);
  console.log("API Response:", data);
console.log("News Articles:", news);

  
  return (
    <Row gutter={[24,24]}>
       {!simplified && 
         <Select 
           showSearch 
           className='select-news'
           placeholder="Select a crypto"
           onChange={(value) => setNewsCategory(value)}
           value={newsCategory}
            filterOption={(input, option) => // Custom filter function
          option.label.toLowerCase().includes(input.toLowerCase())
        }
           options={options}
         ></Select>
       
       }



         {news?.slice(0,count)?.map((item,i)=>{
             return(
              <Col xs={24} sm={12} lg={8} key={i}>
                <Card className='news-card' hoverable>
                    <a href={item.url} target='_blank'>
                        <div className='news-image-container'>
                          <Title className='news-title' level={5}>{item.title}</Title>
                          <img style={{"maxWidth":"100px","maxHeight":"80px"}} src={item.thumbnail || demoImage}></img>
                        </div>
                        <p className='para'>{item.excerpt.length > 100 ? `${item.excerpt.substring(0, 100)}...` : item.excerpt}</p>
                        <div className="provider-container">
                    <div>
                      <Avatar src={item?.publisher?.favicon} alt="" />
                      <Text className="provider-name">{}</Text>
                    </div>
                    <Text>{moment(item.date).startOf('ss').fromNow()}</Text>
                  </div>
                </a>
                </Card>
              </Col>)
         })}
    </Row>
  )
}

export default News;