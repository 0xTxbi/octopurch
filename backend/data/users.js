import bcrypt from 'bcryptjs'

const users = [
	{
		name: 'Admin',
		email: 'admin@octopurch.com',
		password: bcrypt.hashSync('1234', 10),
		isAdmin: true
	},
	{
		name: 'Rachel James',
		email: 'rachjames@octopurch.com',
		password: bcrypt.hashSync('0000', 10),
	}
	{
		name: 'Jeremy James',
		email: 'jerjames@octopurch.com',
		password: bcrypt.hashSync('0000', 10),
	}
]

export default users