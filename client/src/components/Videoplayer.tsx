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

interface IVideoplayer {
	room: string
}

const Videoplayer: React.FC<IVideoplayer> = ({ room }) => {
	return (
		<VideoContainer>
			<Video
				src={
					'http://cloud.cdnland.in/movies/771194a2536bb229de3e1d25b8a5f1b319b54427/76a60cf3968bd4cb64a5a6dd0705e66b:2020121919/360.mp4'
				}
				controls
			></Video>
		</VideoContainer>
	)
}

export default Videoplayer
