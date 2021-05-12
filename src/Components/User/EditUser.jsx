import React, { useEffect, useState } from 'react';
import axios from 'axios';
const base_url = 'http://localhost:5000/users';

const AddUser = (props) => {
	const [name, setName] = useState(props.data['Full Name']);
	const [email, setEmail] = useState(props.data['Email']);
	const [country, setCountry] = useState(props.data['Country']);
	const [dob, setDOB] = useState('');
	const [error, setError] = useState(false);
	const [msg, setMsg] = useState('');

	useEffect(() => {
		var date = new Date(props.data['Date of birth']);
		const month =
			date.getMonth() < 9
				? `0${date.getMonth() + 1}`
				: date.getMonth() + 1;
		const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
		const date_string = `${date.getFullYear()}-${month}-${day}`;
		setDOB(date_string);
	}, [props.data]);

	const submitHandler = (e) => {
		e.preventDefault();
		axios
			.put(`${base_url}/${props.data.Id}/`, {
				'Full Name': name,
				Country: country,
				'Date of birth': `${new Date(dob).toJSON()}`,
				Email: email,
				Id: props.data.Id,
				'Created at': props.data['Created at'],
			})
			.then(() => {
				setError(false);
				setMsg(
					'User Information updated, Kindly refresh for updated data',
				);
			})
			.catch((error) => {
				setError(true);
				setMsg(error.message);
			});
	};
	return (
		<div
			className="modal fade"
			id={`editUser${props.data.Id}`}
			tabIndex="-1"
			aria-labelledby={`editUser${props.data.Id}`}
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5
							className="modal-title"
							id={`editUser${props.data.Id}`}
						>
							Edit user
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
					<div className="modal-body">
						<form onSubmit={submitHandler}>
							<div className="row">
								<div className="form-group col-6">
									<label
										htmlFor="full-name"
										className="col-form-label"
									>
										Full name
										<span className="text-danger"> *</span>
									</label>
									<input
										type="text"
										className="form-control"
										placeholder="Enter full name"
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
										required
									/>
								</div>
								<div className="form-group col-6">
									<label
										htmlFor="email-id"
										className="col-form-label"
									>
										Email
										<span className="text-danger"> *</span>
									</label>
									<input
										type="email"
										className="form-control"
										placeholder="Enter email id"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										required
									/>
								</div>
								<div className="form-group col-6">
									<label
										htmlFor="country"
										className="col-form-label"
									>
										Country
										<span className="text-danger"> *</span>
									</label>
									<input
										type="text"
										className="form-control"
										placeholder="Enter country name"
										value={country}
										onChange={(e) =>
											setCountry(e.target.value)
										}
										required
									/>
								</div>
								<div className="form-group col-6">
									<label
										htmlFor="dob"
										className="col-form-label"
									>
										Date of birth
										<span className="text-danger"> *</span>
									</label>
									<input
										type="date"
										className="form-control"
										placeholder="Enter date of birth"
										value={dob}
										onChange={(e) => setDOB(e.target.value)}
										required
									/>
								</div>
								<div className="form-group col-md-12 text-center">
									{error ? (
										<span className="text-danger">
											{msg}
										</span>
									) : (
										<span className="text-success">
											{msg}
										</span>
									)}
								</div>
								<div className="form-group col-md-12 text-center">
									<button
										type="submit"
										className="btn btn-primary"
									>
										Edit USER
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AddUser;
