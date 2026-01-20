import React,{forwardRef} from 'react'

const Canvas = forwardRef((props, ref) => {
    return (
         <canvas ref={ref} className="absolute top-0 left-0 z-20 touch-action-none"></canvas> 
    )
})

export default Canvas
