import Calendar from "react-calendar";
import PropTypes from "prop-types";
import "react-calendar/dist/Calendar.css";

const ReadOnlyCalendar = ({ initialDate, finalDate }) => {
	const startDate = new Date(initialDate);

	const tileClassName = ({ date }) => {
		const dateStr = date.toISOString().split("T")[0];
		const start = new Date(initialDate).toISOString().split("T")[0];
		const end = new Date(finalDate).toISOString().split("T")[0];

		if (dateStr >= start && dateStr <= end) {
			return "selected-date";
		}
		return null;
	};

	return (
		<div className="readonly-calendar">
			<Calendar
				value={startDate}
				defaultActiveStartDate={startDate}
				tileClassName={tileClassName}
				view="month"
				locale="es-ES"
			/>
		</div>
	);
};

ReadOnlyCalendar.propTypes = {
	initialDate: PropTypes.string.isRequired,
	finalDate: PropTypes.string.isRequired,
};

export default ReadOnlyCalendar;
