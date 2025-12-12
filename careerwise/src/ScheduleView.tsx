/* File ScheduleView.tsx
 * View for a user to schedule a meeting with a mentor
 * COS 420 Team A
 */

import React, { useState } from "react";

/* Import Mantine Components */
import { Button, useMantineTheme, Text} from "@mantine/core";
import { DatePicker, TimeGrid, TimeValue } from "@mantine/dates";
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"

/* Import schedule utilities */
import { getAvailableMeetingStartTimes, getMeeting, getMeetingsFromDate, Meeting, Schedule } from "./schedule";
import { getDates } from "./schedule";

interface ScheduleViewProps {
	schedule: Schedule;
}

/* Factory to generate an excludeDate callback function based on allowed dates  
 * from the schedule 
 * See https://mantine.dev/dates/calendar/?t=props
*/
function makeExcludeDates(schedule: Schedule): (date: string) => boolean {
	/* Create set of date strings */
	const allowedStrSet = new Set(
		/* Filter out dates where there are no available meetings */
		Object.keys(schedule).filter((datestr: string): boolean => {
			return schedule[datestr].some((meeting) => meeting.available);
		})
	);
	/* Return callback function */
	return function(date: string): boolean {
		return !allowedStrSet.has(date);
	}
}

export function ScheduleView({ schedule }: ScheduleViewProps): React.JSX.Element {
	useMantineTheme();

	/* Use states for:
	 *  - "Request Meeting" button visibility
	 *  - Calendar date value
	 *  - Time Grid data
	 *  - Time (selected)
	 *  - Meeting (selected)
	 */
	const [reqMeetingVisible, setReqMeetingVisible] = useState<boolean>(false);
	const [date, setDate] = useState<string | null>(null);
	const [timeGridData, setTimeGridData] = useState<string[]>([]);
	const [time, setTime] = useState<string | null>(null);
	const [meeting, setMeeting] = useState<Meeting | null>(null);


	/* Helper function to handle the newly picked date from the calendar */
	function updateDatePicked(date: (string | null)): void {
		setDate(date);
		setMeeting(null);
		setTime(null);
		/* If the date was changed, update the times in the time grid */
		const meetings = getMeetingsFromDate(schedule, date);
		const startTimes = getAvailableMeetingStartTimes(meetings)
		setTimeGridData(startTimes);
	}
	
	/* Helper function to handle the newly picked time from the grid */
	function updateMeetingPicked(time: (string | null)): void {
		setTime(time);
		setMeeting(getMeeting(schedule, date, time));
		/* If the time was changed, update the request meeting button
		 * visibility
		 */
		if (time) {
			setReqMeetingVisible(true);
			return;
		}
		setReqMeetingVisible(false);
	}
	/* Get the list of Date objects from the schedule */
	const dateList: Date[] = getDates(schedule);

	return <div>
		{/* Calendar view for selecting meeting date */}
		<DatePicker 
			defaultDate={dateList[0]}
			excludeDate={makeExcludeDates(schedule)}
			onChange={updateDatePicked}
			allowDeselect={true}
		/>

		{/* Time grid for selecting a meeting slot */}
		<TimeGrid 
			data={timeGridData}
			allowDeselect={true}
			onChange={updateMeetingPicked}
			value={time}
			format="12h"
		/>

		{/* Request Meeting Button */}
		{reqMeetingVisible && meeting && <Text>
			Selected Meeting:&nbsp;
			<TimeValue value={meeting.startTime} format="12h" /> -&nbsp; 
			<TimeValue value={meeting.endTime} format="12h" />
		</Text>}
		<Button disabled={!reqMeetingVisible}>Request Meeting</Button>
	</div>
}