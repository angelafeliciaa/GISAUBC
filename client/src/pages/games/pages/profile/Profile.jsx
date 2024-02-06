import { Box, IconButton } from '@mui/material';
import { Input } from '@material-tailwind/react';
import React, { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useMediaQuery } from 'react-responsive';
import EditButton from './components/EditButton';

function StyledTextField({ value, label, edit, onChange }) {
	return (
		<Box className='flex flex-col mb-5'>
			<span className='text-lg font-poppins font-normal mb-1'>{label}</span>
			<Input
				variant='outlined'
				value={value}
				className={`rounded-xl font-poppins text-base leading-none outline-1
				outline-black ${edit ? 'text-black' : 'text-gray-400'}`}
				containerProps={{ className: 'h-8' }}
				disabled={!edit}
				onChange={onChange}
			/>
		</Box>
	);
}

export default function Profile({ account, token, setCurrentPage }) {
	const [edit, setEdit] = useState(false);
	const [nickname, setNickname] = useState(account.nickname);
	const isMobileView = useMediaQuery({ query: '(max-width: 1039px)' });

	const handleNicknameChange = (e) => {
		setNickname(e.target.value);
	};

	return (
		<Box
			className='flex xl:px-7 xl:py-16 justify-center
						xl:justify-between w-screen h-screen xl:w-[80vw] xl:h-[95%]'
		>
			<Box
				className='w-full xl:w-1/2 flex flex-col justify-center items-center
							xl:items-start xl:justify-between xl:px-5'
			>
				<Box className='flex items-center'>
					{!isMobileView && (
						<IconButton
							onClick={() => {
								setCurrentPage('Dashboard');
							}}
						>
							<ArrowBackIosNewIcon
								sx={{ color: 'black', stroke: 'black', strokeWidth: 3 }}
								fontSize='small'
							/>
						</IconButton>
					)}
					<span className='font-bold font-poppins text-2xl xl:pl-0.5'>My Profile</span>
				</Box>
				<img
					src={account.profile_picture}
					alt="User's profile"
					style={{ width: 200, height: 200, borderRadius: '50%', borderWidth: '1px' }}
					className='self-center my-10 mb-16 xl:mb-6 xl:my-6'
				/>
				<Box className='xl:px-20'>
					<Box className='flex justify-between '>
						<StyledTextField value={account.first_name} label='First name' edit={false} />
						<StyledTextField value={account.last_name} label='Last name' edit={false} />
					</Box>
					<StyledTextField
						value={nickname}
						onChange={handleNicknameChange}
						fullWidth
						label='Preferred name'
						edit={edit}
					/>
					<StyledTextField value={account.sid} fullWidth label='Student number' edit={false} />
					<StyledTextField value={account.email} fullWidth label='Registered email address' edit={false} />
					<Box className='flex justify-end'>
						<EditButton
							edit={edit}
							setEdit={setEdit}
							uid={account.uid}
							token={token}
							nickname={nickname}
							setNickname={setNickname}
						/>
					</Box>
				</Box>
			</Box>
			{!isMobileView && (
				<Box className='w-1/2 h-full flex flex-col justify-between'>
					<Box className='h-1/2 flex flex-col justify-between'>
						<span className='font-bold font-poppins text-2xl'>Daily Challenges</span>
						<span className='font-poppins text-xl relative h-1/2 mx-auto'>coming soon...</span>
					</Box>
					<Box className='h-1/2 flex flex-col justify-between'>
						<span className='font-bold font-poppins text-2xl'>My Badges</span>
						<span className='font-poppins text-xl relative h-1/2 mx-auto'>coming soon...</span>
					</Box>
				</Box>
			)}
		</Box>
	);
}
