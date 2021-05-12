import React, { useState, useEffect } from 'react';
import SearchSuggestion from './SearchSuggestion';
import axios from 'axios';
import '../../css/Search.css';
const base_url = 'http://localhost:5000/users';

const SearchBar = () => {
	const [keyword, setKeyword] = useState('');
	const [suggestionList, setSuggestionList] = useState(null);

	const OnChangeKeyWord = (e) => {
		setKeyword(e.target.value);
		if (e.target.value) {
			axios(
				`${base_url}?Full%20Name_like=${e.target.value}&_limit=10`,
			).then((res) => setSuggestionList(res.data));
		} else if (e.target.value === '') {
			setSuggestionList(null);
		}
	};

	const renderSuggestionList = ({ suggestionList, keyword }) => {
		if (suggestionList && keyword)
			return <SearchSuggestion dataList={suggestionList} />;
		else return <></>;
	};

	return (
		<div className="form-inline ml-auto">
			<div className="input-group">
				<input
					type="search"
					className="form-control"
					placeholder="Search by name"
					aria-label="Search"
					aria-describedby="button-addon2"
					value={keyword}
					onChange={OnChangeKeyWord}
				/>
				<div className="input-group-append">
					<span
						className="btn btn-outline-light"
						type="button"
						id="button-addon2"
					>
						<i className="fa fa-search" aria-hidden="true"></i>
					</span>
				</div>
				{renderSuggestionList({ keyword, suggestionList })}
			</div>
		</div>
	);
};

export default SearchBar;
