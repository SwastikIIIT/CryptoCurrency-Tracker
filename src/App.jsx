import Navbar from "./components/Navbar";
import "./App.css";
import { Layout, Typography, Space } from "antd";
import { Routes, Route, Link } from "react-router";
import Cryptocurrencies from "./components/Cryptocurrencies";
import CurrencyConverter from "./components/CurrencyConverter";
import CryptoDetails from "./components/CryptoDetails";
import News from "./components/News";
import Homepage from "./components/Homepage";
import ChatBot from "./components/Chatbot";


const App = () => {
  return (
    <>
     <div className="app-wrapper">
       <div className="app">
            <div className="navbar">
              <Navbar />
            </div>

            <div className="main">
              <Layout>
                <div className="routes">
                  <Routes>
                    <Route exact path="/" element={<Homepage />} />
                    <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />}/>
                    <Route exact path="/converter" element={<CurrencyConverter />}/>
                    <Route exact path="/crypto/:coinID" element={<CryptoDetails />} />
                    <Route exact path="/news" element={<News />} />
                  </Routes>
                </div>
              </Layout>

            <ChatBot/>
          </div>
        </div>

        <footer className="footer">
          <Typography.Title level={5} style={{color:"white",textAlign:"center"}}>
           CryptoLens<br/>All rights reserved
           </Typography.Title>
           <Space>
                <Link to="/">Home</Link>
                <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                <Link to="/news">News</Link>
           </Space>
        </footer>
      </div>
      </>
  );
};

export default App;
