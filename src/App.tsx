import { useState, useEffect, useLayoutEffect } from 'react';
import './App.css';
import { genAPI, getTokenTagByEver } from 'arseeding-js-esm';
import { Buffer } from 'buffer';
const App = () => {
  const [account, updateAccount] = useState('');
  const run = async () => {
    const instance = await genAPI((window as any).ethereum);
    console.log(instance);
    const arseedUrl = 'https://arseed.web3infra.dev';
    const data = Buffer.from('hello, arseeding-js web react vite');
    const tags = await getTokenTagByEver('eth', true);
    console.log(tags);
    const payCurrencyTag =
      'ethereum-usdc-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'; // everPay 支持的 token tag (chainType-symbol-id)
    const options = {
      tags: [{ name: 'Content-Type', value: 'text/plain' }],
    };
    const res = await instance.sendAndPay(
      arseedUrl,
      data,
      tags[0],
      options,
      true,
    );
    console.log('res', res);
  };

  return (
    <div className="w-full min-h-screen bg-blue-900 flex flex-col justify-center items-center">
      <h1 className="text-8xl font-bold text-white text-shadow text-center">
        arseeding-js 测试
      </h1>
      <button
        className="rounded-full py-6 px-12 text-3xl mt-16 text-white bg-purple-700 hover:scale-105 hover:bg-purple-600 transition"
        onClick={run}
      >
        gen API
      </button>
      <h3 className="text-3xl text-center text-white mt-12">
        连接地址是: {account}
      </h3>
      <button className="rounded-full py-6 px-12 text-3xl mt-16 text-white bg-purple-700 hover:scale-105 hover:bg-purple-600 transition">
        a
      </button>
    </div>
  );
};

export default App;
