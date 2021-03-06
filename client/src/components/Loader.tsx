import React from 'react'
import styled from 'styled-components'

const Loader = () => {
	return (
		<LoaderWrapper>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</LoaderWrapper>
	)
}

const LoaderWrapper = styled.div`
	width: 60px;
	height: 60px;
	position: absolute;
	top: 50%;
	left: 50%;
	margin: -30px 0 0 -30px;
	transform: rotate(45deg);
	& div {
		width: 6px;
		height: 6px;
		background: blue;
		border-radius: 100%;
		float: left;
		margin-bottom: 12px;
		animation: scaleDot 2s ease infinite;
		&:not(:nth-child(4n + 4)) {
			margin-right: 12px;
		}
		//row 1
		&:nth-child(1) {
			animation-delay: 0;
		}

		//row 2
		&:nth-child(2),
		&:nth-child(5) {
			animation-delay: 0.1s;
		}

		//row 3
		&:nth-child(3),
		&:nth-child(6),
		&:nth-child(9) {
			animation-delay: 0.2s;
		}

		//row 4
		&:nth-child(4),
		&:nth-child(7),
		&:nth-child(10),
		&:nth-child(13) {
			animation-delay: 0.3s;
		}
		//row 5
		&:nth-child(8),
		&:nth-child(11),
		&:nth-child(14) {
			animation-delay: 0.4s;
		}

		//row 6
		&:nth-child(12),
		&:nth-child(15) {
			animation-delay: 0.5s;
		}

		//row 7
		&:nth-child(16) {
			animation-delay: 0.6s;
		}

		@keyframes scaleDot {
			40% {
				transform: scale(1.3) translate(-2px, -2px);
			}
			80% {
				transform: scale(1);
			}

			100% {
				transform: scale(1);
			}
		}
	}
`

export default Loader
