import { useEffect, useState } from "react"
import { Tooltip } from "antd"
import www from './www'

import './index.less'

const overlayInnerStyle = {
  width: 600,
}

const Analyze = (props) => {
  const { astrolabe, horoscope } = props
  const [analyze, setAnalyzeObj] = useState({})

  useEffect(() => {
    if (!astrolabe) return
    const analyzeObj: { [key: string]: string[] } = {}
    const { palaces = [] } = astrolabe ?? {}
    // 男: 命宫主星 三方位 四正位 福德宫 生年四化 夫妻宫 子女宫
    // 女: 命宫主星 三方位 四正位 福德宫 夫妻宫
    // 命宫 兄弟 夫妻 子女 财帛 疾恶 迁移 交友 官禄 田宅 福德 父母
    const soulIdx = palaces.findIndex(p => p.name === '命宫')
    const bodyIdx = palaces.findIndex(p => p.isBodyPalace)
    const siblingsIdx = soulIdx - 1 < 0 ? soulIdx + 11 : soulIdx - 1
    const spouseIdx = soulIdx - 2 < 0 ? soulIdx + 10 : soulIdx - 2
    const childrenIdx = soulIdx - 3 < 0 ? soulIdx + 9 : soulIdx - 3
    const wealthIdx = soulIdx - 4 < 0 ? soulIdx + 8 : soulIdx - 4
    const healthIdx = soulIdx - 5 < 0 ? soulIdx + 7 : soulIdx - 5
    const surfaceIdx = soulIdx - 6 < 0 ? soulIdx + 6 : soulIdx - 6
    const frindIdx = soulIdx - 7 < 0 ? soulIdx + 5 : soulIdx - 7
    const careerIdx = soulIdx - 8 < 0 ? soulIdx + 4 : soulIdx - 8
    const propertyIdx = soulIdx - 9 < 0 ? soulIdx + 3 : soulIdx - 9
    const spiriteIdx = soulIdx - 10 < 0 ? soulIdx + 2 : soulIdx - 10
    const parentIdx = soulIdx - 11 < 0 ? soulIdx + 1 : soulIdx - 11
    // 命宫无主星 看对宫
    const soulMajorStars = palaces[soulIdx]?.majorStars?.length === 0 ? palaces[surfaceIdx]?.majorStars : (palaces[soulIdx]?.majorStars ?? [])
    debugger
    const sihua = []
    let tips: string[] = []
    for (let star of soulMajorStars) {
      tips.push(...www['命宫'][star.name]?.desc)
      if (star.mutagen) {
        sihua.push(`${star.name}在命宫化${star.mutagen}意味着: ${www['命宫'][star.name][star.mutagen]}`)
      }
    }
    analyzeObj.soul = tips
    tips = []
    for (let star of (palaces[siblingsIdx]?.majorStars ?? [])) {
      tips.push(...www['兄弟'][star.name]?.desc)
      if (star.mutagen) {
        sihua.push(`${star.name}在兄弟宫化${star.mutagen}意味着: ${www['兄弟'][star.name][star.mutagen]}`)
      }
    }
    analyzeObj.siblings = tips
    tips = []
    for (let star of (palaces[spouseIdx]?.majorStars ?? [])) {
      tips.push(...www['夫妻'][star.name]?.desc)
      if (star.mutagen) {
        sihua.push(`${star.name}在夫妻宫化${star.mutagen}意味着: ${www['夫妻'][star.name][star.mutagen]}`)
      }
    }
    analyzeObj.spouse = tips
    tips = []
    for (let star of (palaces[childrenIdx]?.majorStars ?? [])) {
      tips.push(...www['子女'][star.name]?.desc)
      if (star.mutagen) {
        sihua.push(`${star.name}在子女宫化${star.mutagen}意味着: ${www['子女'][star.name][star.mutagen]}`)
      }
    }
    analyzeObj.children = tips
    tips = []
    for (let star of (palaces[wealthIdx]?.majorStars ?? [])) {
      tips.push(...www['财帛'][star.name]?.desc)
      if (star.mutagen) {
        sihua.push(`${star.name}在财帛宫化${star.mutagen}意味着: ${www['财帛'][star.name][star.mutagen]}`)
      }
    }
    analyzeObj.wealth = tips
    tips = []
    for (let star of (palaces[healthIdx]?.majorStars ?? [])) {
      tips.push(...www['疾厄'][star.name]?.desc)
      if (star.mutagen) {
        sihua.push(`${star.name}在疾厄宫化${star.mutagen}意味着: ${www['疾厄'][star.name][star.mutagen]}`)
      }
    }
    analyzeObj.health = tips
    tips = []
    for (let star of (palaces[surfaceIdx]?.majorStars ?? [])) {
      tips.push(...www['迁移'][star.name]?.desc)
      if (star.mutagen) {
        sihua.push(`${star.name}在迁移宫化${star.mutagen}意味着: ${www['迁移'][star.name][star.mutagen]}`)
      }
    }
    analyzeObj.surface = tips
    tips = []
    for (let star of (palaces[frindIdx]?.majorStars ?? [])) {
      tips.push(...www['交友'][star.name]?.desc)
      if (star.mutagen) {
        sihua.push(`${star.name}在交友宫化${star.mutagen}意味着: ${www['交友'][star.name][star.mutagen]}`)
      }
    }
    analyzeObj.friend = tips
    tips = []
    for (let star of (palaces[careerIdx]?.majorStars ?? [])) {
      tips.push(...www['官禄'][star.name]?.desc)
      if (star.mutagen) {
        sihua.push(`${star.name}在官禄宫化${star.mutagen}意味着: ${www['官禄'][star.name][star.mutagen]}`)
      }
    }
    analyzeObj.career = tips
    tips = []
    for (let star of (palaces[propertyIdx]?.majorStars ?? [])) {
      tips.push(...www['田宅'][star.name]?.desc)
      if (star.mutagen) {
        sihua.push(`${star.name}在田宅宫化${star.mutagen}意味着: ${www['田宅'][star.name][star.mutagen]}`)
      }
    }
    analyzeObj.property = tips
    tips = []
    for (let star of (palaces[spiriteIdx]?.majorStars ?? [])) {
      tips.push(...www['福德'][star.name]?.desc)
      if (star.mutagen) {
        sihua.push(`${star.name}在福德宫化${star.mutagen}意味着: ${www['福德'][star.name][star.mutagen]}`)
      }
    }
    analyzeObj.spirite = tips
    tips = []
    for (let star of (palaces[parentIdx]?.majorStars ?? [])) {
      tips.push(...www['父母'][star.name]?.desc)
      if (star.mutagen) {
        sihua.push(`${star.name}在父母宫化${star.mutagen}意味着: ${www['父母'][star.name][star.mutagen]}`)
      }
    }
    analyzeObj.parent = tips
    analyzeObj.sihua = sihua

    setAnalyzeObj(analyzeObj)
  }, [astrolabe, horoscope])
  debugger

  if (!Object.keys(analyze).length) return null

  return (
    <div className="analyze-warp">
      <span className="analyze-item-title">
        <Tooltip title={www['命宫'].desc} overlayInnerStyle={overlayInnerStyle}>命宫分析:</Tooltip>
      </span>
      <span className="analyze-item-desc">
        {analyze.soul.map((tip, idx) => (
          <span key={idx}>{idx + 1}. {tip}</span>
        ))}
      </span>
      <span className="analyze-item-title">
        <Tooltip title={www['兄弟'].desc} overlayInnerStyle={overlayInnerStyle}>兄弟宫分析:</Tooltip>
      </span>
      <span className="analyze-item-desc">
        {analyze.siblings.map((tip, idx) => (
          <span key={idx}>{idx + 1}. {tip}</span>
        ))}
      </span>
      <span className="analyze-item-title">
        <Tooltip title={www['夫妻'].desc} overlayInnerStyle={overlayInnerStyle}>夫妻宫分析:</Tooltip>
      </span>
      <span className="analyze-item-desc">
        {analyze.spouse.map((tip, idx) => (
          <span key={idx}>{idx + 1}. {tip}</span>
        ))}
      </span>
      <span className="analyze-item-title">
        <Tooltip title={www['子女'].desc} overlayInnerStyle={overlayInnerStyle}>子女宫分析:</Tooltip>
      </span>
      <span className="analyze-item-desc">
        {analyze.children.map((tip, idx) => (
          <span key={idx}>{idx + 1}. {tip}</span>
        ))}
      </span>
      <span className="analyze-item-title">
        <Tooltip title={www['财帛'].desc} overlayInnerStyle={overlayInnerStyle}>财帛宫分析:</Tooltip>
      </span>
      <span className="analyze-item-desc">
        {analyze.wealth.map((tip, idx) => (
          <span key={idx}>{idx + 1}. {tip}</span>
        ))}
      </span>
      <span className="analyze-item-title">
        <Tooltip title={www['疾厄'].desc} overlayInnerStyle={overlayInnerStyle}>疾厄宫分析:</Tooltip>
      </span>
      <span className="analyze-item-desc">
        {analyze.health.map((tip, idx) => (
          <span key={idx}>{idx + 1}. {tip}</span>
        ))}
      </span>
      <span className="analyze-item-title">
        <Tooltip title={www['迁移'].desc} overlayInnerStyle={overlayInnerStyle}>迁移宫分析:</Tooltip>
        </span>
      <span className="analyze-item-desc">
        {analyze.surface.map((tip, idx) => (
          <span key={idx}>{idx + 1}. {tip}</span>
        ))}
      </span>
      <span className="analyze-item-title">
        <Tooltip title={www['交友'].desc} overlayInnerStyle={overlayInnerStyle}>交友宫分析:</Tooltip>
      </span>
      <span className="analyze-item-desc">
        {analyze.friend.map((tip, idx) => (
          <span key={idx}>{idx + 1}. {tip}</span>
        ))}
      </span>
      <span className="analyze-item-title">
        <Tooltip title={www['官禄'].desc} overlayInnerStyle={overlayInnerStyle}>官禄宫分析:</Tooltip>
      </span>
      <span className="analyze-item-desc">
        {analyze.career.map((tip, idx) => (
          <span key={idx}>{idx + 1}. {tip}</span>
        ))}
      </span>
      <span className="analyze-item-title">
        <Tooltip title={www['田宅'].desc} overlayInnerStyle={overlayInnerStyle}>田宅宫分析:</Tooltip>
      </span>
      <span className="analyze-item-desc">
        {analyze.property.map((tip, idx) => (
          <span key={idx}>{idx + 1}. {tip}</span>
        ))}
      </span>
      <span className="analyze-item-title">
        <Tooltip title={www['福德'].desc} overlayInnerStyle={overlayInnerStyle}>福德宫分析:</Tooltip>
      </span>
      <span className="analyze-item-desc">
        {analyze.spirite.map((tip, idx) => (
          <span key={idx}>{idx + 1}. {tip}</span>
        ))}
      </span>
      <span className="analyze-item-title">
        <Tooltip title={www['父母'].desc} overlayInnerStyle={overlayInnerStyle}>父母宫分析:</Tooltip>
      </span>
      <span className="analyze-item-desc">
        {analyze.parent.map((tip, idx) => (
          <span key={idx}>{idx + 1}. {tip}</span>
        ))}
      </span>
      <span className="analyze-item-title">
        <Tooltip title={www['父母'].desc} overlayInnerStyle={overlayInnerStyle}>生年四化分析:</Tooltip>
      </span>
      <span className="analyze-item-desc">
        {analyze.sihua.map((tip, idx) => (
          <span key={idx}>{tip}</span>
        ))}
      </span>
      <span className="analyze-tips">*分析内容仅供娱乐*</span>
    </div>
  )
}

export default Analyze