import React, { useState } from 'react';

var curr_data = new Date();
var curr_year = curr_data.getFullYear();

const YearFilter = (props) => {
	const [year, changeYear] = useState('');
	const [isError, changeError] = useState(false);

	const sendData = (e) => {
		let value = parseInt(e.target.value);
		if (value <= curr_year && value >= 1900) {
			changeError(false);
			changeYear(value);
			props.YearData(value);
		} else if (e.target.value === '') {
			changeError(false);
			changeYear('');
			props.YearData('');
		} else if (value < curr_year) {
			changeYear(value);
			changeError(true);
		}
	};

	return (
		<div className="form-group">
			<h6>Select year of birth</h6>
			<input
				className="form-control"
				onChange={sendData}
				type="number"
				minLength="4"
				maxLength="4"
				min="1900"
				max={curr_year}
				step="1"
				value={year}
				placeholder="Enter Year"
			/>
			{isError && (
				<label>
					<span className="text-danger">
						Year should be between 1900 - {curr_year}
					</span>
				</label>
			)}
		</div>
	);
};

export default YearFilter;
