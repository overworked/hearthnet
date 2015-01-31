Template.login.events({

  'submit #login-form' : function(e, templateInstance){
    e.preventDefault();
    var username = templateInstance.find('#login-username').value;
    var password = templateInstance.find('#login-password').value;

    Meteor.loginWithPassword(username, password, function(err){
        if (err) {
          console.log(err);
        } else {
          //redirect
          console.log('user has been logged in');
        }
    });
      return false; 
    }
  });