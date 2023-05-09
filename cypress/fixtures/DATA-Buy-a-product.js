const buyAProduct = (faker) => {
	const data = {
		email : faker.internet.email(),
		firstName : faker.name.firstName(),
		lastName : faker.name.lastName(),
		streetAddress : faker.address.streetAddress(),
		city : faker.address.city(),
		country : 'Romania',
		postCode : faker.address.zipCode(),
		state : 'Cluj',
		phone : faker.phone.number(),
	}
	return data
}

module.exports = buyAProduct 