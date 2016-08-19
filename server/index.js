import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  var uploadedName = '';
  UploadServer.init({
    tmpDir: process.env.PWD + '/.upload/tmp',
    uploadDir: process.env.PWD + '/.upload/',
    checkCreateDirectories: true,
    imageTypes: /.(gif|jpe?g|png)$/i,
    getFileName: function(fileInfo, formData){
    	uploadedName = fileInfo.name.substring(0, fileInfo.name.lastIndexOf('.')-1) + new Date().getTime() + '.' + fileInfo.type.split('/')[1];
    	//name of file uploaded + timestamp + . type of file (jpg/png)
    	return uploadedName;
    },
    finished: function(fileInfo, formFields) {
      fileInfo.uploadedName = uploadedName;
      let http = require('http');
      let newurl = fileInfo.url.substr(0, fileInfo.url.lastIndexOf('/')+1) + uploadedName;
      http.get({
        host: 'rentflees.com',
        path: '/uploadimg.php?file='+uploadedName+'&url='+newurl
      });
   	},
    mimeTypes: {
    //"html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "gif": "image/gif",
    /*
    "js": "text/javascript",
    "css": "text/css",
    "pdf": "application/pdf",
    "doc": "application/msword",
    "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "zip": "application/zip, application/x-compressed-zip",
    "txt": "text/plain"
    */
  }
  });
  //Services Configuration
  if(!FlowRouter._askedToWait) {
    FlowRouter.initialize();
  }
});

Accounts.onCreateUser(function(options, user) {
  //user.role = "owner";
  if (options.profile)
   user.profile = options.profile;
  console.log(user);
  //console.log(user.profile.fruit);
  return user;
});


Meteor.methods({
  registerUser: function (user,role) {
    //console.log("role = " + role);
    user.profile.role = role;
    Accounts.createUser(user);
    /*
     Accounts.createUser(user, function(err){
          if (err) {
            console.log(err);
          } else {
            alert("Successfully Registered");
          }

        });
        */
  }
});


/*
Meteor.publish("tenantDir", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile.role: "tenant"}});
});
*/
