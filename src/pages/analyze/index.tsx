import { useEffect, useState } from "react"
import starsDesctiption from './starsDesc'

import './index.less'

const Analyze = (props) => {
  const { astrolabe, horoscope } = props
  const [analyze, setAnalyzeObj] = useState({})

  useEffect(() => {
    if (!astrolabe) return
    const analyzeObj: { [key: string]: string[] } = {}
    const { palaces = [] } = astrolabe ?? {}
    // 男: 命宫主星 三方位 四正位 福德宫 生年四化 夫妻宫 子女宫
    // 女: 命宫主星 三方位 四正位 福德宫 夫妻宫
    const soulIdx = palaces.findIndex(p => p.name === '命宫')
    const bodyIdx = palaces.findIndex(p => p.isBodyPalace)
    const wealthIdx = soulIdx - 4 < 0 ? soulIdx + 8 : soulIdx - 4
    const careerIdx = soulIdx - 8 < 0 ? soulIdx + 4 : soulIdx - 8
    const oppsiteIdx = soulIdx - 6 < 0 ? soulIdx + 6 : soulIdx - 6
    const spiriteIdx = soulIdx - 10 < 0 ? soulIdx + 2 : soulIdx - 10
    const brotherIdx = soulIdx - 11 < 0 ? soulIdx + 1 : soulIdx - 11
    const frindIdx = soulIdx - 5 < 0 ? soulIdx + 7 : soulIdx - 5
    const parentIdx = soulIdx - 1 < 0 ? soulIdx + 11 : soulIdx - 1
    const spouseIdx = soulIdx - 2 < 0 ? soulIdx + 10 : soulIdx - 2
    const childIdx = soulIdx - 3 < 0 ? soulIdx + 9 : soulIdx - 3
    // 命宫无主星 看对宫
    const soulMajorStars = (palaces[soulIdx]?.majorStars?.length === 0 ? palaces[oppsiteIdx]?.majorStars : palaces[soulIdx]?.majorStars) ?? []
    debugger
    let tips: string[] = []
    for (let star of soulMajorStars) {
      tips.push(...starsDesctiption[star.name])
    }
    analyzeObj.soul = tips
    tips = []
    for (let star of (palaces[spouseIdx]?.majorStars ?? [])) {
      tips.push(...starsDesctiption[star.name])
    }
    analyzeObj.spouse = tips
    tips = []
    for (let star of (palaces[childIdx]?.majorStars ?? [])) {
      tips.push(...starsDesctiption[star.name])
    }
    analyzeObj.child = tips
    tips = []
    for (let star of (palaces[parentIdx]?.majorStars ?? [])) {
      tips.push(...starsDesctiption[star.name])
    }
    analyzeObj.parent = tips
    tips = []
    for (let star of (palaces[frindIdx]?.majorStars ?? [])) {
      tips.push(...starsDesctiption[star.name])
    }
    analyzeObj.friend = tips
    tips = []
    for (let star of (palaces[brotherIdx]?.majorStars ?? [])) {
      tips.push(...starsDesctiption[star.name])
    }
    analyzeObj.brother = tips

    tips = []
    for (let star of (palaces[wealthIdx]?.majorStars ?? [])) {
      tips.push(...starsDesctiption[star.name])
    }
    analyzeObj.wealth = tips
    tips = []
    for (let star of (palaces[careerIdx]?.majorStars ?? [])) {
      tips.push(...starsDesctiption[star.name])
    }
    analyzeObj.career = tips
    tips = []
    for (let star of (palaces[spiriteIdx]?.majorStars ?? [])) {
      tips.push(...starsDesctiption[star.name])
    }
    analyzeObj.spirite = tips

    setAnalyzeObj(analyzeObj)
  }, [astrolabe, horoscope])

  console.log(Object.keys(analyze).length)

  if (!Object.keys(analyze).length) return null

  return (
    <div className="analyze-warp">
      <span className="analyze-title">简易分析:</span>
      <span className="analyze-item-title">先天性格/特质评估:</span>
      <span className="analyze-item-desc">
        {analyze.soul.map((tip, idx) => (
          <span key={idx}>{idx + 1}. {tip}</span>
        ))}
      </span>
      <span className="analyze-item-title">兄弟姐妹评估:</span>
      <span className="analyze-item-desc">
        {analyze.brother.map((tip, idx) => (
          <span key={idx}>{idx + 1}. {tip}</span>
        ))}
      </span>
      <span className="analyze-item-title">配偶评估:</span>
      <span className="analyze-item-desc">
        {analyze.spouse.map((tip, idx) => (
          <span key={idx}>{idx + 1}. {tip}</span>
        ))}
      </span>
      <span className="analyze-item-title">子女评估:</span>
      <span className="analyze-item-desc">
        {analyze.child.map((tip, idx) => (
          <span key={idx}>{idx + 1}. {tip}</span>
        ))}
      </span>
      <span className="analyze-item-title">父母评估:</span>
      <span className="analyze-item-desc">
        {analyze.parent.map((tip, idx) => (
          <span key={idx}>{idx + 1}. {tip}</span>
        ))}
      </span>
      <span className="analyze-item-title">朋友/伙伴评估:</span>
      <span className="analyze-item-desc">
        {analyze.friend.map((tip, idx) => (
          <span key={idx}>{idx + 1}. {tip}</span>
        ))}
      </span>
    </div>
  )
}

export default Analyze