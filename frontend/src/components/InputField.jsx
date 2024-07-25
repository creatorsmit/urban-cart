import { useField } from 'formik';
import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

const InputField = ({ label, ...props }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [field, meta] = useField(props);

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			{label && (
				<Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
			)}
			{props.type === 'password' ? (
				<InputGroup className='mb-3'>
					<Form.Control
						className='text-input'
						{...field}
						{...props}
						isInvalid={meta.error && meta.touched}
						aria-label='basic-addon1'
						type={showPassword ? 'text' : props.type}
					/>

					{props.type === 'password' && (
						<InputGroup.Text
							id='basic-addon1'
							onClick={() => setShowPassword((prev) => !prev)}
							style={{ cursor: 'pointer', borderRadius: '0 4px 4px 0' }}
						>
							{showPassword ? <Eye /> : <EyeSlash />}
						</InputGroup.Text>
					)}
					{meta.error && meta.touched ? (
						<Form.Control.Feedback type='invalid' style={{ fontSize: '12px' }}>
							{meta.error}
						</Form.Control.Feedback>
					) : null}
				</InputGroup>
			) : (
				<div className='mb-3'>
					<Form.Control
						className='text-input'
						{...field}
						{...props}
						isInvalid={meta.error && meta.touched}
						aria-label='basic-addon1'
						type={showPassword ? 'text' : props.type}
					/>
					{meta.error && meta.touched ? (
						<Form.Control.Feedback type='invalid' style={{ fontSize: '12px' }}>
							{meta.error}
						</Form.Control.Feedback>
					) : null}
				</div>
			)}
		</div>
	);
};

export default InputField;
