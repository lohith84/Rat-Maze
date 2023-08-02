import React, { useState } from 'react';
import {
	COLOR_CLOSED,
	COLOR_OPEN,
	COLOR_PATH,
	COLOR_TEMP_PATH,
	COLOR_FACE,
} from './Cell';
const InstructionData = [
	{
		style: { backgroundColor: COLOR_OPEN },
		data: 'Open',
	},
	{
		style: { backgroundColor: COLOR_CLOSED },
		data: 'Obstacle',
	},
	{
		style: { backgroundColor: COLOR_FACE },
		data: 'Start and end Point',
	},
	{
		style: { backgroundColor: COLOR_TEMP_PATH },
		data: 'Temporary path',
	},
	{
		style: { backgroundColor: COLOR_PATH },
		data: 'Final path',
	},
];
export default function Instruction() {
	const [isOpen, setIsOpen] = useState(false);
	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};
	return (
		<details open={isOpen}>
			<summary onClick={toggleOpen}>Instructions</summary>
			<div className="Instruction">
				{InstructionData.map((ld, i) => (
					<div className="Instruction-cell" key={i}>
						<div style={ld.style}></div>
						<span>{ld.data}</span>
					</div>
				))}
			</div>
			<div className="info">
				<p>
					Click the boxes to add barriers
				</p>
				<p>
				This is designed such that the rat can only make new moves in the 'down' and 'right' directions.
				</p>
			</div>
		</details>
	);
}