import React from 'react';
import { Box, Typography } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

export default function Profile({ username, picture }) {
	const isMobileView = useMediaQuery({ query: '(max-width: 1039px)' });

	return (
		<Box
			className={`bg-${
				isMobileView ? 'transparent' : 'gamesBox'
			} w-full h-full rounded-2xl flex flex-col justify-center items-center mr-2`}
		>
			<Typography style={{ fontSize: '14px' }}>Welcome,</Typography>
			<Box className='flex flex-row justify-center items-center my-5 gap-3'>
				{!isMobileView && (
					<img
						src={picture}
						alt='profile_pic'
						style={{
							width: '50px',
							height: '50px',
							objectFit: 'cover',
							borderRadius: '50%',
							justifySelf: 'center',
							alignSelf: 'center',
						}}
					/>
				)}
				<div
					style={{
						width: isMobileView ? '100%' : '70%',
						overflow: 'auto',
						maxWidth: isMobileView ? '100%' : '70%',
					}}
				>
					<Typography style={{ fontWeight: 'bold' }}>{username}</Typography>
				</div>
			</Box>
		</Box>
	);
}
