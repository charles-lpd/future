import { useState, useEffect, useLayoutEffect } from 'react'
import './App.css'
import SearchInput from './components/SearchInput'
import { getUserInfo } from './api/index'
const App = () => {
  const [value, update] = useState('')
  const [userinfo, updateUserInfo] = useState<any[]>([])
  const updateAsyncUserInfo = async () => {
    const data = await getUserInfo()
    updateUserInfo(data)
    console.log(userinfo)
  }
  useLayoutEffect(() => {
    updateAsyncUserInfo()
    return () => {}
  }, [value])
  return (
    <div className="App">
      <div className="flex items-center justify-center w-full mt-24">
        <div>数据库查询测试</div>
      </div>
      <div>
        <SearchInput value={value} updateValue={update} />
        <div>搜索</div>
      </div>
      <div>
        <div></div>
      </div>
      {userinfo.length &&
        userinfo.map((item) => {
          return (
            <div key={item.id}>
              <div>id:{item.id}</div>
              <div>username:{item.username}</div>
              <div>password:{item.password}</div>
              <div>status:{item.status}</div>
            </div>
          )
        })}
    </div>
  )
}

export default App
