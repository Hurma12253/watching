import React from 'react'
import styled from 'styled-components'

const VideoContainer = styled.div`
	height: 100%;
	width: 100%;
	background: black;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Video = styled.video`
	width: 100%;
	object-fit: cover;
	outline: none;
`

const Videoplayer = () => {
	return (
		<VideoContainer>
			<Video
				src={
					'http://cloud.cdnland.in/movies/771194a2536bb229de3e1d25b8a5f1b319b54427/795268fa2d93b25df4c6ef94b4f00d5f:2020120821/360.mp4'
				}
				// autoPlay
				controls
			></Video>
		</VideoContainer>
	)
}

export default Videoplayer
