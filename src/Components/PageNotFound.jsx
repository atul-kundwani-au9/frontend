import { Link } from 'react-router-dom';

const PageNotFound = () => {
	return (
		<div className="container text-center mt-5">
			<h1>Page Not found</h1>
			<Link to="/">Go to Home Page</Link>
		</div>
	);
};
export default PageNotFound;
