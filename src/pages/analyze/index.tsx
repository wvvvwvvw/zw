import { useEffect, useState } from "react"
import { Tooltip } from "antd"
import www from './www'

import './index.less'

const overlayInnerStyle = {
  width: 400,
}
const PALACES = ['命宫', '兄弟', '夫妻', '子女', '财帛', '疾厄', '迁移', '仆役', '官禄', '田宅', '福德', '父母']

const Analyze = (props) => {
  const { astrolabe, horoscope } = props
  const [analyze, setAnalyzeObj] = useState({})

  useEffect(() => {
    if (!astrolabe) return
    const { palaces = [] } = astrolabe ?? {}
    // 男: 命宫主星 三方位 四正位 福德宫 生年四化 夫妻宫 子女宫
    // 女: 命宫主星 三方位 四正位 福德宫 夫妻宫
    // 命宫 兄弟 夫妻 子女 财帛 疾厄 迁移 仆役 官禄 田宅 福德 父母
    const sihua = []
    const analyzeObj = {}
    for (let i = 0; i < PALACES.length; i ++) {
      const placeName = PALACES[i]
      const place = palaces.find(p => p.name === placeName)
      const majorStarts = place.majorStars.length > 0 ? place.majorStars : palaces.find(p => p.name === PALACES[(i + 6) % 12])?.majorStars
      const tips: string[] = []
      for (let mStar of majorStarts) {
        tips.push(...www[placeName][mStar.name]?.desc)
        if (mStar.mutagen && (i === place.index)) {
          sihua.push(`${mStar.name}星在${placeName}化${mStar.mutagen}代表: ${www[placeName][mStar.name][mStar.mutagen]}`)
        }
      }
      for (let mStar of place.minorStars) {
        tips.push(...www[placeName][mStar.name]?.desc)
        if (mStar.mutagen) {
          sihua.push(`${mStar.name}星在${placeName}化${mStar.mutagen}代表: ${www[placeName][mStar.name][mStar.mutagen]}`)
        }
      }
      analyzeObj[placeName] = tips
    }
    analyzeObj["生年四化"] = sihua
    

    setAnalyzeObj(analyzeObj)
  }, [astrolabe, horoscope])

  console.log(astrolabe, analyze)
  if (!Object.keys(analyze).length) return null

  return (
    <div className="analyze-warp">
      {Object.keys(analyze).map((key) => (
        <div key={key}>
          <span className="analyze-item-title">
            <Tooltip title={www[key]?.desc} overlayInnerStyle={overlayInnerStyle}>{key}分析:</Tooltip>
          </span>
          <span className="analyze-item-desc">
            {analyze[key].map((tip, idx) => (
              <span key={idx}>{idx + 1}. {tip};</span>
            ))}
          </span>
        </div>
      ))}
      
      <span className="analyze-tips">*分析内容仅供娱乐*</span>
    </div>
  )
}

export default Analyze