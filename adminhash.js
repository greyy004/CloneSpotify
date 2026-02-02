import bcrypt from 'bcrypt';

const password = 'admin1029'; // change this
const saltRounds = 10;

bcrypt.hash(password, saltRounds).then(hash => {
    console.log('Bcrypt hash:', hash);
});
