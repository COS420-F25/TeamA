/* File ScheduleView.tsx
 * View for a user to schedule a meeting with a mentor
 * COS 420 Team A
 */

import React from "react";


/* Import Mantine Components */
import { 
	DatePicker
 } from "@mantine/dates";
import "@mantine/core/styles.css"

export function ScheduleView(): React.JSX.Element {

	return <div>
		<DatePicker />
	</div>
}