export const users: Record<string, string> = {
    'maryam1@gmail.com': 'Maryam@123',
    'jimmy_biker@nl.rogers.com': 'testTest', // invalid password - should not allow login
};

{
    /*
  sample user data for login form:
  - dataset from https://jsonplaceholder.typicode.com/users
  - username is case insensitive
  - password is case sensitive
  - password is first part of zipcode + first word of city if multi-word

  user: sincere@april.biz
  pass: 92998Gwenborough

  user: nathan@yesenia.net
  pass: 59590McKenziehaven

  user: julianne.oconner@kory.org
  pass: 53919South

  */
}
