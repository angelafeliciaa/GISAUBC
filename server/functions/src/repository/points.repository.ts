import { sha256 } from "js-sha256";
import { db } from "./../index"
import { addPointsModel } from "../middleware/interfaces/points.interfaces";
import { User } from "../model/user";

const secretCode = process.env.HASH_SECRET_CODE;

export async function addPoints(user: User, userPayload: addPointsModel) {
	const uuid = sha256(userPayload.uid + secretCode)
	const userDocRef = db.collection("users").doc(uuid);

	const totalPoints = user.total_points + userPayload.points;
	const pastActivities = handlePastActivities(userPayload.points, user.past_activities)
	await userDocRef.set({
		uid: userPayload.uid,
		total_points: totalPoints,
		past_activities: pastActivities,
		updated_at: userPayload.updated_at
	});
}

export async function getLeaderboard() {
	const leaderboardSnapshot = await db.collection("users")
		.orderBy("points", "desc")
		.limit(10)
		.get();

	const leaderboardData = leaderboardSnapshot.docs.map(doc => {
		return doc.data()
	});

	const leaderboard = leaderboardData.map(data => ({
		first_name: data.first_name,
		points: data.points
	}))

	return leaderboard;
}


function handlePastActivities(points: number, pastActivities: [number]) {
	if (pastActivities.length >= 14) {
		pastActivities.pop();
	}
	pastActivities.push(points);
}