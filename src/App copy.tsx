import { useState, useEffect, useLayoutEffect } from 'react';
import './App.css';
import SearchInput from './components/SearchInput';
import { getUserInfo, getUser } from './api/index';
import { UserInfo } from './api/type';
import Everpay from 'everpay';
const App = () => {
  const [value, update] = useState('');
  const [userinfo, updateUserInfo] = useState<UserInfo[]>([]);
  const updateAsyncUserInfo = async () => {
    const data = await getUserInfo();
    updateUserInfo(data);
  };
  const everpay = new Everpay({
    debug: true,
  });
  console.log(everpay);
  useLayoutEffect(() => {
    return () => {};
  }, []);
  const updateUserDetails = async () => {
    if (value) {
      const userdetails = await getUser(value);
      console.log(userdetails);
      updateUserInfo(userdetails);
    } else {
      updateAsyncUserInfo();
    }
  };
  return (
    <div className="App">
      <div className="flex items-center justify-center w-full mt-24">
        <div>数据库查询测试</div>
      </div>
      <div className="flex items-center justify-center">
        <SearchInput value={value} updateValue={update} />
        <div onClick={() => updateUserDetails()}>搜索</div>
      </div>
      <div className="flex flex-col items-center justify-center">
        {userinfo.length &&
          userinfo.map((item) => {
            return (
              <div key={item.id} className="mt-3 w-44">
                <div>
                  <span className="mr-2">id:</span>
                  {item.id}
                </div>
                <div>
                  <span className="mr-2">username:</span>
                  {item.username}
                </div>
                <div>
                  <span className="mr-2">password:</span>
                  {item.password}
                </div>
                <div>
                  <span className="mr-2">status:</span>
                  {item.status}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default App;
