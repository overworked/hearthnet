Template.register.events({
 'submit #register-form' : function(e, templateInstance){
  e.preventDefault();
  var username = templateInstance.find('#account-username').value;
  var password = templateInstance.find('#account-password').value;

  Accounts.createUser({username: username, password : password}, function(err){
    if (err) {
      console.log(err);
    } else {
          //redirect
          console.log('user has been registered and logged in');
        }
      });
  return false;
}
});