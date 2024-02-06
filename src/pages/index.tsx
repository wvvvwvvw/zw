import { useState } from 'react'
import { Dropdown, Modal } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useIztro } from 'iztro-hook'
import IztroMain from './iztro/Iztro'
import './index.less'
import AddHostModal from './basic/AddHostModal';
import Analyze from './analyze'

const DocsPage = () => {
  const [hostList, setHostList] = useState([{
    birthday: '1991-8-16',
    birthdayType: 'solar',
    birthTime: 2,
    gender: 'female',
    fixLeap: true,
  }])
  const [selectedHost, setSelectedHost] = useState({})
  const [showHostModal, setHostModal] = useState(false)
  const { astrolabe, horoscope, setHoroscope } = useIztro({
    birthday: selectedHost.birthday ?? '',
    birthdayType: selectedHost.birthdayType ?? '',
    birthTime: selectedHost.birthTime ?? 0,
    gender: selectedHost.gender ?? '',
    fixLeap: selectedHost.fixLeap ?? false,
  });

  const handleSelectHost = (host: any) => {
    setSelectedHost({ ...host })
  }

  const handleAddHost = () => {
    setHostModal(true)
  }

  const handleHideModal = () => {
    setHostModal(false)
  }

  const handleAddHostSubmit = (record) => {
    setHostList([
      record,
      ...hostList,
    ])
    handleHideModal()
  }

  const handleDeleteHost = (idx) => {
    const result = hostList.filter((host, index) => index !== idx)
    setHostList(result)
    setSelectedHost(result[0] ?? {})
  }

  return (
    <div className='container'>
      <div className='header'>
        <span>XXXXX</span>
        <div>
        </div>
      </div>
      <div className='content'>
        <ul className='left'>
          <li className='host-item button' onClick={handleAddHost}>添加</li>
          {hostList.map((host, idx) => (
            <li
              key={host.birthday}
              className='host-item'
            >
              <span className='hostLabel' onClick={() => handleSelectHost(host)}>{host.name ?? ''} {host.birthday} {host.general === 'male' ? '男' : '女'}</span>
              <span className='deleteBtn' onClick={() => handleDeleteHost(idx)}><DeleteOutlined /></span>
            </li>
          ))}
        </ul>
        <div className='right'>
          <div className='iztro'>
            <div className='izplace'>
              <IztroMain
                astrolabe={astrolabe}
                horoscope={horoscope}
                setHoroscope={setHoroscope}
                birthday={selectedHost.birthday}
                birthTime={selectedHost.birthTime}
              />
            </div>
            <div className='izanalyst'>
              <Analyze
                astrolabe={astrolabe}
                horoscope={horoscope}
                setHoroscope={setHoroscope}
              />
            </div>
          </div>
          <div className='copyright'></div>
        </div>
      </div>
      <AddHostModal
        visible={showHostModal}
        hide={handleHideModal}
        submit={handleAddHostSubmit}
      />
    </div>
  );
};

export default DocsPage;
