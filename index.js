// index.js

// 导入必需的库和模块
const express = require('express');
const { ethers } = require('ethers');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const Web3 = require('web3');
const axios = require('axios');

// 初始化 Express 应用
const app = express();
app.use(bodyParser.json());

// 设置 Web3
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

// React 组件示例
const App = () => {
    return React.createElement('div', null, 'Hello, Ethereum world!');
};

// Express 路由
app.get('/', async (req, res) => {
    try {
        // 使用 ethers 获取当前的区块号
        const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);
        const blockNumber = await provider.getBlockNumber();

        // 使用 React 服务器端渲染
        const reactApp = ReactDOMServer.renderToString(React.createElement(App));
        
        res.send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Ethereum React App</title>
                </head>
                <body>
                    <div id="app">${reactApp}</div>
                    <p>Current block number: ${blockNumber}</p>
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// 其他 API 路由
app.post('/data', async (req, res) => {
    // 例如，使用 Axios 调用外部 API
    try {
        const response = await axios.get('https://api.example.com/data');
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error fetching external data');
    }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
