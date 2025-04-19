"use client"
import React, { useEffect, useState } from "react"
import { animated, useSpring } from "@react-spring/web"
import RichText from "./index"

type Props = React.ComponentProps<typeof RichText> & {
  id?: string
}

const RichTextWithAnimation: React.FC<Props> = ({ id = "0", ...rest }) => {
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setLoad(true)
  }, [])

  const fade = useSpring({
    opacity: load ? 1 : 0,
    from: { opacity: 0 },
    config: { tension: 280, friction: 60 },
  })

  return (
    <animated.div key={id} style={fade} className={rest.className}>
      <RichText {...rest} />
    </animated.div>
  )
}

export default RichTextWithAnimation
