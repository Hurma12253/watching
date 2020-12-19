import React from 'react'
import styled from 'styled-components'

interface IErrorProps {
	children: string
}

const Error: React.FC<IErrorProps> = ({ children }) => {
	return <ErrorWrapper>{children}</ErrorWrapper>
}

const ErrorWrapper = styled.div`
	max-width: 350px;
	width: 100%;
	height: auto;
    color: red;
`

export default Error
