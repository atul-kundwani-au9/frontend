import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Country = (props) => {
	const [list, setList] = useState(null);

	useEffect(() => {
		axios('http://localhost:5000/users').then((data) => {
			var ab = data.data.map((user) => user.Country);
			var unique = [...new Set(ab)];
			setList(unique.sort());
		});
	}, []);

	const countrySelect = (e) => {
		props.CountryData(e.target.value);
	};

	return (
		<div className="form-group">
			<h6>Select country</h6>
			<select className="form-control" onChange={countrySelect}>
				<option value="">Choose Country</option>
				{list &&
					list.map((country, idx) => {
						return (
							<option key={idx} value={country}>
								{country}
							</option>
						);
					})}
			</select>
		</div>
	);
};

export default Country;
