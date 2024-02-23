import { useIztro } from 'iztro-hook'
import React, { useState, useMemo } from 'react'
import { RiseOutlined } from '@ant-design/icons'
import { useEffect } from 'react';
import classNames from 'classnames'
import { Scope } from "iztro/lib/data/types";
import { normalizeDateStr } from "lunar-lite";
import { IzpalaceCenter as IzCenter } from './Izcenter'
import { Izpalace } from './Izplace'

import './theme.css'
import './Iztro.css'

const IztroMain = (props: any) => {
  const { birthday, astrolabe, horoscope, setHoroscope, isPhoneDevice } = props
  const [activeHeavenlyStem, setActiveHeavenlyStem] = useState();
  const [hoverHeavenlyStem, setHoverHeavenlyStem] = useState();
  const [focusedIndex, setFocusedIndex] = useState<number>();
  const [showDecadal, setShowDecadal] = useState(false);
  const [showYearly, setShowYearly] = useState(false);
  const [showMonthly, setShowMonthly] = useState(false);
  const [showDaily, setShowDaily] = useState(false);
  const [showHourly, setShowShowHourly] = useState(false);
  const [horoscopeDate, setHoroscopeDate] = useState<string | Date>();
  const [horoscopeHour, setHoroscopeHour] = useState<number>();

  // console.log(astrolabe, horoscope)

  const toggleShowScope = (scope: Scope) => {
    switch (scope) {
      case "decadal":
        setShowDecadal(!showDecadal);
        break;
      case "yearly":
        setShowYearly(!showYearly);
        break;
      case "monthly":
        setShowMonthly(!showMonthly);
        break;
      case "daily":
        setShowDaily(!showDaily);
        break;
      case "hourly":
        setShowShowHourly(!showHourly);
        break;
    }
  };

  const toggleActiveHeavenlyStem = (heavenlyStem) => {
    if (heavenlyStem === activeHeavenlyStem) {
      setActiveHeavenlyStem(undefined);
    } else {
      setActiveHeavenlyStem(heavenlyStem);
    }
  };

  const dynamic = useMemo(() => {
    if (showHourly) {
      return {
        arrowIndex: horoscope?.hourly.index,
        arrowScope: "hourly" as Scope,
      };
    }

    if (showDaily) {
      return {
        arrowIndex: horoscope?.daily.index,
        arrowScope: "daily" as Scope,
      };
    }

    if (showMonthly) {
      return {
        arrowIndex: horoscope?.monthly.index,
        arrowScope: "monthly" as Scope,
      };
    }

    if (showYearly) {
      return {
        arrowIndex: horoscope?.yearly.index,
        arrowScope: "yearly" as Scope,
      };
    }

    if (showDecadal) {
      return {
        arrowIndex: horoscope?.decadal.index,
        arrowScope: "decadal" as Scope,
      };
    }
  }, [showDecadal, showYearly, showMonthly, showDaily, showHourly, horoscope]);

  useEffect(() => {
    setHoroscopeDate(props.horoscopeDate ?? new Date());
    setHoroscopeHour(props.horoscopeHour ?? 0);
  }, [props.horoscopeDate, props.horoscopeHour]);

  useEffect(() => {
    setHoroscope(horoscopeDate ?? new Date(), horoscopeHour);
  }, [horoscopeDate, horoscopeHour])

  if (!birthday) {
    return isPhoneDevice ? <p className='please-select please-select-pc'>点击上方按钮选择命主 <RiseOutlined /></p> : <p className='please-select'>请选择一个命主</p>
  }

  return (
    <div className={classNames("iztro-astrolabe", "iztro-astrolabe-theme-default")}>
      {astrolabe?.palaces.map((palace, idx) => {
        return (
          <Izpalace
            key={palace.earthlyBranch}
            focusedIndex={focusedIndex}
            onFocused={setFocusedIndex}
            horoscope={horoscope}
            showDecadalScope={showDecadal}
            showYearlyScope={showYearly}
            showMonthlyScope={showMonthly}
            showDailyScope={showDaily}
            showHourlyScope={showHourly}
            toggleScope={toggleShowScope}
            activeHeavenlyStem={activeHeavenlyStem}
            toggleActiveHeavenlyStem={toggleActiveHeavenlyStem}
            hoverHeavenlyStem={hoverHeavenlyStem}
            setHoverHeavenlyStem={setHoverHeavenlyStem}
            isPhoneDevice={isPhoneDevice}
            {...palace}
          />
        );
      })}
      <IzCenter
        astrolabe={astrolabe}
        horoscope={horoscope}
        horoscopeDate={horoscopeDate}
        horoscopeHour={horoscopeHour}
        setHoroscopeDate={setHoroscopeDate}
        setHoroscopeHour={setHoroscopeHour}
        isPhoneDevice={isPhoneDevice}
        {...dynamic}
      />
    </div>
  )
}

export default IztroMain