import React from "react";
import { Button, Space,Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined,MoneyCollectOutlined,BulbOutlined,FundOutlined,MenuOutlined} from "@ant-design/icons";
// import icon from "../../favicon.png";

const { Title } = Typography;
const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
      <Space >
        <Avatar size="large" shape="square" src={"/favicon.png"}></Avatar>
        <Title level={2} className="logo">
          <Link to="/">CryptoLens</Link>
        </Title>
        </Space>
      </div>


      <Menu theme="dark">
          <Menu.Item key="1" icon={<HomeOutlined/>}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FundOutlined/>}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<BulbOutlined/>}>
            <Link to="/news">News</Link>
          </Menu.Item>
      </Menu>


    </div>
  );
};

export default Navbar;
