import React, { useState } from 'react';
import axios from 'axios';
const base_url = 'http://localhost:5000/users';

const AddUser = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [country, setCountry] = useState('');
	const [dob, setDOB] = useState('');
	const [error, setError] = useState(false);
	const [msg, setMsg] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		axios
			.post(base_url, {
				'Full Name': name,
				Country: country,
				'Date of birth': `${new Date(dob).toJSON()}`,
				Email: email,
				'Created at': `${new Date().toJSON()}`,
			})
			.then(() => {
				setError(false);
				setMsg(
					'User added succesfully, Kindly refresh for updated data',
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
			id="exampleModal"
			tabIndex="-1"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">
							Add new user
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
										id="full-name"
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
										id="email-id"
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
										id="country"
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
										id="dob"
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
										ADD USER
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
