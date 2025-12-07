/* File schedule.ts
 * Utilities for parsing JSON schedule for meetings
 * COS 420 Team A
 */

/* Define schedule type */
export type Schedule = {
	[date: string]: {
		startTime: string;
		endTime: string;
		available: boolean;
	}[];
}

/* Function getDates
 * Return a list of sorted Date objects given schedule data
 */
export function getDates(schedule: Schedule): Date[] {
	const datesList: Date[] = Object.keys(schedule).map((datestr: string): Date => {
		const [year, month, day] = datestr.split('-').map(Number);
		return new Date(year, month - 1, day); // month is 0-indexed
	});
	return datesList.sort((a, b) => a.getTime() - b.getTime());
}

/* Function getMeetingsFromDate
 * Return a list of Meetings given a date and the schedule data
 */
export function getMeetingsFromDate(date: Date) {
	return [];
}