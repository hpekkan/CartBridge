import React from 'react'

export default function Header(props) {
	return (
		<div>
		<div className={props.title}>
		{props.store} Store
		</div>

		</div>
		)
}