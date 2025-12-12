/* File schedule.ts
 * Utilities for parsing JSON schedule for meetings
 * COS 420 Team A
 */

/* Define Meeting type */
export type Meeting = {
	startTime: string;
	endTime: string;
	available: boolean;
}

/* Define schedule type */
export type Schedule = {
	[date: string]: Meeting[]
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
export function getMeetingsFromDate(schedule: Schedule, date: (string | null)): Meeting[] {
	if (date && date in schedule) {
		return schedule[date];
	}
	return [];
}

/* Function getAvailableMeetingStartTimes
 * Return a string array of the start times for each meeting that is marked
 * as available
 */
export function getAvailableMeetingStartTimes(meetings: Meeting[]): string[] {
	const availableMeetings = meetings.filter((m: Meeting): boolean =>
		m.available
	);
	return availableMeetings.map((m: Meeting): string => m.startTime);

}

/* Function getMeeting
 * Get a meeting object given the schedule, date, and start time
 */
export function getMeeting(
	schedule: Schedule,
	date: (string | null),
	time: (string | null)
	): 
	(Meeting | null) {
	const meetings = getMeetingsFromDate(schedule, date);
	for (const meeting of meetings) {
		if (meeting.startTime === time) {
			return meeting;
		}
	}
	return null;
}