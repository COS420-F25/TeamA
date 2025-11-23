/* File ScheduleView.tsx
 * View for a user to schedule a meeting with a mentor
 * COS 420 Team A
 */

import React from "react";


/* Import Mantine Components */
import { Button, useMantineTheme } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import "@mantine/core/styles.css"

export function ScheduleView(): React.JSX.Element {

	useMantineTheme();
	
	return <div>
		{/* Calendar view for selecting meeting date */}
		<DatePicker />

		{/* Request Meeting Button */}
		<Button disabled={true}>Request Meeting</Button>
	</div>
}