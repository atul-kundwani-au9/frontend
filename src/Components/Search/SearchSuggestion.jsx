import { withRouter } from 'react-router-dom';

const SearchSuggestion = (props) => {
	const OpenViewUser = (e) => {
		props.history.push(`/viewUser/${e.target.id}`);
	};
	const renderSuggestion = () => {
		if (props.dataList.length > 0) {
			return props.dataList.map((suggestion, idx) => {
				return (
					<div onClick={OpenViewUser} id={suggestion.Id} key={idx}>
						<span
							type="button"
							className="text-white"
							id={suggestion.Id}
							onClick={OpenViewUser}
						>
							{suggestion['Full Name']}
						</span>
					</div>
				);
			});
		} else {
			return <div>No user data found</div>;
		}
	};
	return (
		<div className="searchResult" id="match-list">
			{renderSuggestion(props)}
		</div>
	);
};

export default withRouter(SearchSuggestion);
