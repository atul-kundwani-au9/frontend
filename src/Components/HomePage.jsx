import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './Filter/Filter';
import UserSection from './User/UserSection';
const base_url = 'http://localhost:5000/users';
const HomePage = () => {
	const [page_no, setPageNo] = useState(1);
	const [userList, setUserList] = useState(null);
	const [filter_value, setFilterValue] = useState('');

	useEffect(() => {
		axios(`${base_url}?_page=1&_limit=20`).then((list) =>
			setUserList(list.data),
		);
	}, []);

	const changePage = (e) => {
		var new_page_no = e.target.id === 'next' ? page_no + 1 : page_no - 1;
		setPageNo(new_page_no);
		axios(
			`${base_url}?${filter_value}&_page=${new_page_no}&_limit=20`,
		).then((list) => setUserList(list.data));
	};

	const getFilterValues = (curr_year, curr_country) => {
		let filter_url = '';
		if (curr_year && curr_country) {
			filter_url = `Date+of+birth_like=${curr_year}&Country=${curr_country}`;
		} else if (curr_year) {
			filter_url = `Date+of+birth_like=${curr_year}`;
		} else if (curr_country) {
			filter_url = `Country=${curr_country}`;
		}
		setFilterValue(filter_url);
		axios(
			`${base_url}?${filter_url}&_page=${page_no}&_limit=20`,
		).then((list) => setUserList(list.data));
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<Filter
						filterValue={(year, country) =>
							getFilterValues(year, country)
						}
					/>
				</div>
				<div className="col-md-10 d-flex flex-row flex-wrap mt-4">
					<UserSection data={userList} />
				</div>
				<div className="col-2"></div>
				<div className="col-10 pb-3 pr-5 pl-5">
					{page_no !== 1 && (
						<button
							className="btn primary_bg arrow-btn"
							id="back"
							onClick={changePage}
						>
							<i
								className="fa fa-long-arrow-left"
								aria-hidden="true"
							></i>
							&emsp; Back
						</button>
					)}
					{userList && userList.length === 20 && (
						<button
							className="btn primary_bg arrow-btn float-right"
							id="next"
							onClick={changePage}
						>
							Next &emsp;
							<i
								className="fa fa-long-arrow-right"
								aria-hidden="true"
							></i>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default HomePage;
