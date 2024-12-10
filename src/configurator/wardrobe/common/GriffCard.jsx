import { useCallback } from "react"
import Config from "../../config"

import { ReactComponent as InfoIcon } from "../../../assets/icons/info_icon.svg"

export default function GriffCard(props) {
  const { imageUrl, type, griff_type, className } = props

  return (
    <div className="relative">
      <div className={className}
      >
        <img src={imageUrl} draggable={false} className="rounded-[10px] h-[95px]"/>
      </div>
      <div className="absolute right-0 top-0 cursor-target">
        <InfoIcon />
      </div>
    </div>
  )
}
