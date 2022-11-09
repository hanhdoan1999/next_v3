import React from 'react'
import "./styles.scss"
import ReactPlayer from 'react-player'

function VideoSection({videoUrl,video}) {
    function ShowVideo(){
        if(videoUrl!==undefined){
          if(videoUrl!==null||video?.mediaItemUrl!==null){
          return(
            <div className="video__out__store__page">
            <ReactPlayer
                        className="videoFrame"
                        url={videoUrl!==null?videoUrl:video.mediaItemUrl}
                        playing={false}
                        height={"100%"}
                        width={"100%"}
                        />
            </div>
          )
          }else{
              return(
                <></>
              )
          }
        }
    }
  return (
    <>{ShowVideo()}</>
  )
}

export default VideoSection