export const emailValidation = {
	required: 'Email is required',
	pattern: {
		value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
		message: 'Invalid Email',
	},
};

const PasswordRegEx =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const PasswordValidation = {
	required: 'This field is required',
	pattern: {
		value: PasswordRegEx,
		message:
			'At least 6 characters: UPPER/lowercase, numbers and special characters',
	},
};
