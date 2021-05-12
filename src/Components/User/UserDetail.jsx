import EditUser from './EditUser';
import '../../css/UserDetail.css';
import DeleteUser from './DeleteUser';
const UserDetail = (props) => {
	return (
		<div className="card mb-4 card-user">
			<div className="card-header primary_bg text-white">
				<h5 className="text-center">{props.userData['Full Name']}</h5>
			</div>
			<div className="card-body">
				<p>
					<b>Country</b>: {props.userData.Country}
				</p>
				<p>
					<b>DOB</b>: &nbsp;
					{props.userData['Date of birth']
						? new Date(
								props.userData['Date of birth'],
						  ).toLocaleString('default', { dateStyle: 'long' })
						: 'Not available'}
				</p>
				<p>
					<b>Email</b>: {props.userData['Email']}
				</p>
			</div>
			<div className="card-footer bg-white d-flex justify-content-around">
				<button
					className="btn btn-warning rounded-circle"
					type="button"
					data-toggle="modal"
					data-target={`#editUser${props.userData.Id}`}
					data-whatever="@mdo"
				>
					<i className="fa fa-pencil" aria-hidden="true"></i>
				</button>
				<button
					className="btn btn-danger rounded-circle"
					type="button"
					data-toggle="modal"
					data-target={`#deleteUser${props.userData.Id}`}
				>
					<i className="fa fa-trash" aria-hidden="true"></i>
				</button>
			</div>
			<DeleteUser
				userId={props.userData.Id}
				key={`delete${props.userData.Id}`}
			/>
			<EditUser data={props.userData} key={`edit${props.userData.Id}`} />
		</div>
	);
};

export default UserDetail;
