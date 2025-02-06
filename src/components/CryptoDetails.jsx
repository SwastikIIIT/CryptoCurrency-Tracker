import React from 'react'
import {Row,Col,Typography,Select} from "antd";
import { useParams } from 'react-router-dom';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser/lib/index';
const CryptoDetails = () => {

  const {rank}=useParams();
  return (
    <div>CryptoDetails</div>
  )
}

export default CryptoDetails