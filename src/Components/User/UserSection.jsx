import UserDetail from './UserDetail';

const UserSection = (props) => {
	if (props.data && props.data.length > 0) {
		return props.data.map((user, idx) => {
			return <UserDetail userData={user} key={idx} />;
		});
	} else if (!props.data) {
		return (
			<div class="d-flex justify-content-center">
				<div class="spinner-border" role="status">
					<span class="sr-only">Loading...</span>
				</div>
			</div>
		);
	} else {
		return <h1>No user data found</h1>;
	}
};

export default UserSection;
