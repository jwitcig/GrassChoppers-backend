
module.exports.createUser = ({ email, password, name }) => {
  console.log('creating new user:', email, password, name)

  return {
    id: 'some-user-id',
    email,
    name,
  }
}

module.exports.findUser = ({ email, name, id }) => {
  console.log('finding user:', email, name, id)

  return {
    id,
    email,
    name,
  }
}