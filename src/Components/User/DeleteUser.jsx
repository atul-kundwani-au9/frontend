import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
const base_url = 'http://localhost:5000/users';

const DeleteUser = (props) => {
	const [error, setError] = useState(false);
	const [msg, setMsg] = useState('');
	const deleteUser = () => {
		axios
			.delete(`${base_url}/${props.userId}/`)
			.then(() => {
				setError(false);
				setMsg(
					'User Information deleted, Kindly refresh for updated data',
				);
				props.history.push('/');
			})
			.catch((error) => {
				setError(true);
				setMsg(error.message);
			});
	};
	return (
		<div
			className="modal fade"
			id={`deleteUser${props.userId}`}
			tabIndex="-1"
			aria-labelledby={`deleteUser${props.userId}`}
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5
							className="modal-title"
							id={`deleteUser${props.userId}`}
						>
							Warning
						</h5>
						<button
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body text-center">
						Are your Sure? You want to delete
						<p>
							{error ? (
								<span className="text-danger">{msg}</span>
							) : (
								<span className="text-primary">{msg}</span>
							)}
						</p>
					</div>
					<div className="modal-footer d-flex justify-content-around">
						<button
							type="button"
							className="btn btn-danger"
							data-dismiss="modal"
							onClick={deleteUser}
						>
							Delete User
						</button>
						<button
							type="button"
							className="btn btn-secondary"
							data-dismiss="modal"
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(DeleteUser);
