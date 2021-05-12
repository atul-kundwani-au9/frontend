import AddUser from './User/AddUser';
import SearchBar from './Search/SearchBar';
const Header = () => {
	return (
		<nav className="navbar navbar-dark primary_bg">
			<a className="navbar-brand" href="/">
				 APP
			</a>
			<div className="d-flex justify-content-center">
				<SearchBar />
				<ul className="navbar-nav ml-3">
					<li className="nav-item active">
						<button
							type="button"
							className="nav-link add_btn"
							data-toggle="modal"
							data-target="#exampleModal"
							data-whatever="@mdo"
						>
							<i
								className="fa fa-user-plus"
								aria-hidden="true"
							></i>
						</button>
					</li>
				</ul>
			</div>
			<AddUser />
		</nav>
	);
};

export default Header;
