/**
  * This is the users class.
  * It has the following attributes:
  *   id
  *   name
  *   email
  *   institute
  *   mobile
*/

/** Class declaration */
function User(id, name, email, institute, mobile){
      this.id = id;
      this.name = name;
      this.email = email;
      this.institute = institute;
      this.mobile = mobile;
}

/** Getter method */
User.prototype.getDetails = function () {
  UserObj = {id: this.id,
              name: this.name,
              email: this.email,
              institute: this.institute,
              mobile: this.mobile};
  return UserObj;
}


module.exports =  User;
