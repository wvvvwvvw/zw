import { useEffect, useState } from 'react'
import { Dropdown, Modal } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useIztro } from 'iztro-hook'
import IztroMain from './iztro/Iztro'
import './index.less'
import AddHostModal from './basic/AddHostModal';
import Analyze from './analyze'

interface HOST {
  birthday: string
  birthdayType: string
  birthTime: number
  gender: string
  fixLeap: boolean
  name?: string
}

const DocsPage = () => {
  const localstorage = localStorage.getItem('astrolabes') ? JSON.parse(localStorage.getItem('astrolabes')) : []
  const [hostList, setHostList] = useState<HOST[]>(localstorage)
  const [selectedHost, setSelectedHost] = useState<HOST>({})
  const [selectedIdx, setSelectedIdx] = useState<number | undefined>(undefined)
  const [showHostModal, setHostModal] = useState<boolean>(false)
  const { astrolabe, horoscope, setHoroscope } = useIztro({
    birthday: selectedHost.birthday ?? '',
    birthdayType: selectedHost.birthdayType ?? '',
    birthTime: selectedHost.birthTime ?? 0,
    gender: selectedHost.gender ?? '',
    fixLeap: selectedHost.fixLeap ?? false,
  });

  useEffect(() => {
    localStorage.setItem('astrolabes', JSON.stringify(hostList))
  }, [hostList])

  const handleSelectHost = (host: any, idx: number) => {
    setSelectedHost({ ...host })
    setSelectedIdx(idx)
  }

  const handleAddHost = () => {
    setHostModal(true)
  }

  const handleHideModal = () => {
    setHostModal(false)
  }

  const handleAddHostSubmit = (record: HOST) => {
    setHostList([
      record,
      ...hostList,
    ])
    handleHideModal()
  }

  const handleDeleteHost = (idx: number) => {
    const result = hostList.filter((host, index) => index !== idx)
    setHostList(result)
    setSelectedHost(result[0] ?? {})
  }

  return (
    <div className='container'>
      <div className='header'>
        <span>紫微斗数简易排盘及分析工具</span>
        <div>
        </div>
      </div>
      <div className='content'>
        <div className='left'>
          <ul>
            <li className='host-item button' onClick={handleAddHost}>添加命主</li>
            {hostList.map((host, idx) => (
              <li
                key={host.birthday}
                className={`host-item ${selectedIdx !== idx ? '' : 'host-item-selected'}`}
              >
                <span className='hostLabel' onClick={() => handleSelectHost(host, idx)}>{host.name || '匿名'} {host.birthday}{host.birthdayType === 'solar' ? '(阳)' : '(阴)'} {host.gender === 'male' ? '男' : '女'}</span>
                <span className='deleteBtn' onClick={() => handleDeleteHost(idx)}><DeleteOutlined /></span>
              </li>
            ))}
          </ul>
          <div className='wx-info'>
            <span>欢迎指教, 微信: wvvw_vwwv</span>
          </div>
        </div>
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
          <div className='copyright'>
            <a target='_blank' href="https://beian.miit.gov.cn/#/Integrated/index">京ICP备2024042874号</a>
          </div>
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
