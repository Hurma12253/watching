import React from 'react'
import styled from 'styled-components'

interface IInputWithIconProps {
	imgSrc: string
	onClick?: () => void
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	placeholder?: string
}

const InputWithIcon: React.FC<IInputWithIconProps> = ({
	imgSrc,
	onChange,
	placeholder,
	onClick,
}) => {
	return (
		<InputWrapper>
			<ImageWrapper>
				<img src={imgSrc} alt="none" onClick={onClick} />
			</ImageWrapper>
			<input onChange={onChange} placeholder={placeholder} />
		</InputWrapper>
	)
}

const InputWrapper = styled.div`
	display: flex;
	height: auto;
	width: 100%;
	align-items: center;
	box-shadow: 0px 0px 9px -1px rgba(0, 0, 0, 0.25);

	& input {
		height: 100%;
		width: 100%;
		border: none;
		outline: none;
		font-size: 18px;
	}
`
const ImageWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
    cursor: pointer;

	& img {
		width: 19px;
	}
`

export default InputWithIcon
