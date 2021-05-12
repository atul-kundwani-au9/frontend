import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteUser from './DeleteUser';
import { Link, withRouter } from 'react-router-dom';
const base_url = 'http://localhost:5000/users';

const ViewUser = (props) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [country, setCountry] = useState('');
	const [dob, setDOB] = useState('');
	const [data, setData] = useState([]);
	const [error, setError] = useState(false);
	const [msg, setMsg] = useState('');

	useEffect(() => {
		axios.get(`${base_url}?Id=${props.match.params.id}`).then((list) => {
			setData(list.data[0]);
			setName(list.data[0]['Full Name']);
			setEmail(list.data[0]['Email']);
			setCountry(list.data[0]['Country']);
			var date = new Date(list.data[0]['Date of birth']);
			const month =
				date.getMonth() < 9
					? `0${date.getMonth() + 1}`
					: date.getMonth() + 1;
			const day =
				date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
			const date_string = `${date.getFullYear()}-${month}-${day}`;
			setDOB(date_string);
		});
	}, [props.match.params.id]);

	const submitHandler = (e) => {
		e.preventDefault();
		axios
			.put(`${base_url}/${props.match.params.id}/`, {
				'Full Name': name,
				Country: country,
				Id: data.Id,
				'Date of birth': `${new Date(dob).toJSON()}`,
				Email: email,
				'Created at': data['Created at'],
			})
			.then(() => {
				setError(false);
				setMsg('User Information updated, Redirecting to home page');
				setTimeout(() => {
					props.history.push('/');
				}, 1500);
			})
			.catch((error) => {
				setError(true);
				setMsg(error.message);
			});
	};
	return (
		<div
			className="container d-flex flex-column justify-content-center align-items-center"
			style={{ height: '90vh' }}
		>
			<div className="card" style={{ width: '400px' }}>
				<div className="card-header primary_bg text-white">
					<h4 className="text-center">User Detail</h4>
				</div>
				<div className="card-body">
					<form onSubmit={submitHandler}>
						<div className="row">
							<div className="form-group col-12">
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
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>
							<div className="form-group col-12">
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
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className="form-group col-12">
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
									onChange={(e) => setCountry(e.target.value)}
									required
								/>
							</div>
							<div className="form-group col-12">
								<label htmlFor="dob" className="col-form-label">
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
									<span className="text-danger">{msg}</span>
								) : (
									<span className="text-success">{msg}</span>
								)}
							</div>
							<div className="form-group col-md-12 d-flex justify-content-around">
								<button
									type="submit"
									className="btn btn-primary"
								>
									Edit USER
								</button>
								<button
									className="btn btn-danger"
									type="button"
									data-toggle="modal"
									data-target={`#deleteUser${props.match.params.id}`}
								>
									Delete User
								</button>
								<DeleteUser userId={props.match.params.id} />
								<Link to="/" className="btn btn-info">
									Go Back
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
export default withRouter(ViewUser);
