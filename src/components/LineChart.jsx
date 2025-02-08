import React from 'react';
import {useGetPriceHistoryQuery} from "../services/cryptoMainApi";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import Loader2 from './Loader2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


const LineChart = ({coinID,yAxis}) => {

const {data,isLoading,error}=useGetPriceHistoryQuery(coinID,10);
// console.log(data);
// console.log(data?.prices);

if(isLoading) return <Loader2/>
const graph=yAxis==="prices"?data?.prices:yAxis==="market_caps"?data?.market_caps:data?.total_volumes;
const xAxis=yAxis==="prices"?`Price of ${coinID} in USD`:yAxis==="market_caps"?`Market capital of ${coinID} in USD`:`Total volumes of ${coinID}`;
const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${coinID.toUpperCase()} ${yAxis==="prices"?"price":yAxis==="market_caps"?"market capital":"total volume"} data over time`,
      },
    },
  };


const priceHistory={
    labels:graph?.map((item)=>{
        const date = new Date(item[0]).toLocaleDateString();
        return date;
    }),
    datasets:[
        {
            label:xAxis,
            data:graph?.map((item)=>{
                return item[1];
            }),
            borderColor: yAxis==="prices"?'rgba(255, 159, 64, 1)':yAxis==="market_caps"?"rgb(64, 255, 83)":"rgb(210, 63, 47)", 
            fill: false,
            tension:0.2,
        },
    ],
}


  return (
    <div>
    <Line options={options} data={priceHistory}></Line>
    </div>
  )
}

export default LineChart