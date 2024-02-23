import { useEffect, useState, Fragment } from 'react'
import { Dropdown, Modal, Drawer } from 'antd'
import { DeleteOutlined, UnorderedListOutlined } from '@ant-design/icons'
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
  name?: string
}

const DocsPage = () => {
  const localstorage = localStorage.getItem('astrolabes') ? JSON.parse(localStorage.getItem('astrolabes')) : []
  const [hostList, setHostList] = useState<HOST[]>(localstorage)
  const [selectedHost, setSelectedHost] = useState<HOST>({})
  const [selectedIdx, setSelectedIdx] = useState<number | undefined>(undefined)
  const [showHostModal, setHostModal] = useState<boolean>(false)
  const [isPhoneDevice, setIsPhoneDevice] = useState<boolean>(false)
  const [drawerStatus, setDrawerStatus] = useState(false)
  const { astrolabe, horoscope, setHoroscope } = useIztro({
    birthday: selectedHost.birthday ?? '',
    birthdayType: selectedHost.birthdayType ?? '',
    birthTime: selectedHost.birthTime ?? 0,
    gender: selectedHost.gender ?? '',
  });

  useEffect(() => {
    const isPhone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    setIsPhoneDevice(isPhone)
  }, [])

  useEffect(() => {
    localStorage.setItem('astrolabes', JSON.stringify(hostList))
  }, [hostList])

  const handleSelectHost = (host: any, idx: number) => {
    setSelectedHost({ ...host })
    setSelectedIdx(idx)
    setDrawerStatus(false)
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

  const handleDeleteHost = (record: HOST, idx: number) => {
    Modal.confirm({
      title: '删除命主',
      content: <div className='delete-host-modal'>
        <span>确认删除</span>
        <span className='red'>{record.name || '匿名'} - {record.birthday}</span>
        <span className='ml30'>吗?</span>
      </div>,
      okText: '确定',
      cancelText: '取消',
      width: 300,
      onOk: () => {
        const result = hostList.filter((host, index) => index !== idx)
        setHostList(result)
        setSelectedHost(result[0] ?? {})
      }
    })
  }

  const onDrawerOpen = () => {
    setDrawerStatus(true)
  }

  const onDrawerClose = () => {
    setDrawerStatus(false)
  }

  return (
    <div className='container'>
      <div className='header'>
        <span>紫微斗数排盘及简易分析</span>
        {isPhoneDevice &&
          <span className='icon' onClick={onDrawerOpen}><UnorderedListOutlined /></span>
        }
      </div>
      {isPhoneDevice ? <>
        <div className='iztro' style={{ flexDirection: 'column' }}>
          <div className='izplace'>
            <IztroMain
              astrolabe={astrolabe}
              horoscope={horoscope}
              setHoroscope={setHoroscope}
              birthday={selectedHost.birthday}
              birthTime={selectedHost.birthTime}
              isPhoneDevice={isPhoneDevice}
            />
          </div>
          <div className='izanalyst'>
            <Analyze
              astrolabe={astrolabe}
              horoscope={horoscope}
              setHoroscope={setHoroscope}
              isPhoneDevice={isPhoneDevice}
            />
          </div>
          <div className='copyright'>
            <a target='_blank' href="https://beian.miit.gov.cn/#/Integrated/index">京ICP备2024042874号</a>
          </div>
          <Drawer
            title="选择命主"
            placement="right"
            width={240}
            onClose={onDrawerClose}
            open={drawerStatus}
          >
            <div className='left phone-left'>
              <ul>
                <li className='host-item button' onClick={handleAddHost}>添加命主</li>
                {hostList.map((host, idx) => (
                  <li
                    key={host.birthday}
                    className={`host-item ${selectedIdx !== idx ? '' : 'host-item-selected'}`}
                  >
                    <span className='hostLabel' onClick={() => handleSelectHost(host, idx)}>{host.name || '匿名'} - {host.birthday}{host.birthdayType === 'solar' ? '(阳)' : '(阴)'} - {host.gender === 'male' ? '男' : '女'}</span>
                    <span className='deleteBtn' onClick={() => handleDeleteHost(host, idx)}><DeleteOutlined /></span>
                  </li>
                ))}
              </ul>
              <div className='wx-info'>
                <span>微信: wvvw_vwwv, 欢迎交流</span>
              </div>
            </div>
          </Drawer>
        </div>
      </> :
      <div className='content'>
        <div className='left pc-left'>
          <ul>
            <li className='host-item button' onClick={handleAddHost}>添加命主</li>
            {hostList.map((host, idx) => (
              <li
                key={host.birthday}
                className={`host-item pc-host-item ${selectedIdx !== idx ? '' : 'host-item-selected'}`}
              >
                <span className='hostLabel' onClick={() => handleSelectHost(host, idx)}>{host.name || '匿名'} - {host.birthday}{host.birthdayType === 'solar' ? '(阳)' : '(阴)'} - {host.gender === 'male' ? '男' : '女'}</span>
                <span className='deleteBtn' onClick={() => handleDeleteHost(idx)}><DeleteOutlined /></span>
              </li>
            ))}
          </ul>
          <div className='wx-info'>
            <span>微信: wvvw_vwwv, 欢迎交流</span>
          </div>
        </div>
        <div className='right'>
            <div className='iztro iztro-pc'>
            <div className='izplace'>
              <IztroMain
                astrolabe={astrolabe}
                horoscope={horoscope}
                setHoroscope={setHoroscope}
                birthday={selectedHost.birthday}
                birthTime={selectedHost.birthTime}
                isPhoneDevice={isPhoneDevice}
              />
            </div>
            <div className='izanalyst'>
              <Analyze
                astrolabe={astrolabe}
                horoscope={horoscope}
                setHoroscope={setHoroscope}
                isPhoneDevice={isPhoneDevice}
              />
            </div>
          </div>
          <div className='copyright'>
            <a target='_blank' href="https://beian.miit.gov.cn/#/Integrated/index">京ICP备2024042874号</a>
          </div>
        </div>
      </div>}
      <AddHostModal
        visible={showHostModal}
        hide={handleHideModal}
        submit={handleAddHostSubmit}
      />
    </div>
  );
};

export default DocsPage;
