import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import pointIcon from '../../assets/games/points_icon.svg';
import user from './user.json';

function getRankSuffix(rank) {
	const lastDigit = rank % 10;
	const lastTwoDigits = rank % 100;

	if (lastDigit === 1 && lastTwoDigits !== 11) {
		return 'st';
	}
	if (lastDigit === 2 && lastTwoDigits !== 12) {
		return 'nd';
	}
	if (lastDigit === 3 && lastTwoDigits !== 13) {
		return 'rd';
	}
	return 'th';
}

export default function Points() {
	const { points, target, rank, highest } = user;
	const rankSuffix = getRankSuffix(rank);

	const [animatedValue, setAnimatedValue] = useState(0);

	useEffect(() => {
		const animationDuration = 1500;

		let startTime;

		function animate(timestamp) {
			if (!startTime) startTime = timestamp;
			const progress = Math.min(1, (timestamp - startTime) / animationDuration);

			setAnimatedValue(easeInOut(progress) * (points / highest) * 100);

			if (progress < 1) {
				requestAnimationFrame(animate);
			}
		}

		requestAnimationFrame(animate);

		return () => {
			setAnimatedValue((points / highest) * 100);
		};
	}, [points, highest]);

	function easeInOut(t) {
		return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	}

	return (
		<Box className="w-full h-full rounded-2xl flex flex-col justify-center items-center">
			<Box className="h-full" style={{ aspectRatio: '1 / 1' }}>
				<CircularProgressbarWithChildren
					value={animatedValue}
					styles={{
						height: '100%',
						path: {
							stroke: '#BFA285',
						},
						trail: { stroke: '#F5F1ED' },
					}}
				>
					<div className="flex flex-col justify-center items-center gap-3">
						<strong style={{ fontSize: 15 }}>Total Points</strong>
						<div className="flex items-center">
							<strong style={{ fontSize: 18 }}>{points}</strong>
							<img src={pointIcon} alt="" className="w-10 ml-7 mb-7 absolute" />
						</div>
					</div>
					<div
						className="w-1/2 flex flex-col mt-3 justify-center items-center text-center"
						style={{ fontSize: 10 }}
					>
						Earn&nbsp;{target}&nbsp;points to reach&nbsp;{rank}
						{rankSuffix}&nbsp;place!
					</div>
				</CircularProgressbarWithChildren>
			</Box>
		</Box>
	);
}
