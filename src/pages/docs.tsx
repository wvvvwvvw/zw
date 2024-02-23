import './index.less'
import IztroMain from './iztro/Iztro'
import React, { useState } from 'react'

const DocsPage = () => {
  const [hostList, setHostList] = useState([{
    birthday: '1993-8-16',
    birthdayType: 'solar',
    birthTime: 2,
    gender: 'female',
  }])
  const [selectedHost, setSelectedHost] = useState({
    birthday: '',
    birthdayType: 'solar',
    birthTime: 2,
    gender: 'female',
  })

  const handleSelectHost = (host: any) => {
    setSelectedHost({ ...host })
  }

  return (
    <div className='container'>
      <div className='header'></div>
      <div className='content'>
        <div className='left'>
          {hostList.map(host => (
            <p key={host.birthday} onClick={() => handleSelectHost(host)}>{host.birthday}</p>
          ))}
        </div>
        <div className='right'>
          <div className='iztro'>
            <IztroMain
              {...selectedHost}
            />
          </div>
          <div className='copyright'></div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
