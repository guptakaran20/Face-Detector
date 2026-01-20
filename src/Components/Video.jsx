import React,{forwardRef} from 'react'

const Video = forwardRef((props, ref) => {
    return (
         <video playsInline muted ref={ref} autoPlay className="relative z-10 block max-w-full h-auto rounded-2xl touch-action-none"></video>
    )
})

export default Video
