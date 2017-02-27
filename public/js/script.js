function onSignIn(googleUser){
            id_token = googleUser.getAuthResponse().id_token;
            //console.log(id_token);
            var profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId());
            console.log('Name: ' + profile.getName());
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:8082/login');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function() {
              if(xhr.readystate == XMLHttpRequest.DONE){
                  if(xhr.status===200){
                    console.log('Signed in!');
                  }else{
                    console.log('Invalid token!')
                  }
              }
            };
            xhr.send(JSON.stringify({idtoken: id_token}));
        }

 function renderButton() {
                gapi.signin2.render('my-signin2', {
                  'scope': 'profile email',
                  'width': 240,
                  'height': 50,
                  'longtitle': true,
                  'theme': 'dark',
                  'onsuccess': onSignIn
                });
              }

 $(document).ready(function(){
          $('#signOutButton').click(function(){
              console.log('clicked logout');
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:8082/logout');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function() {
              if(xhr.readystate == XMLHttpRequest.DONE){
                  if(xhr.status===200){
                    console.log('Logged out!');
                  }else{
                    console.log('Login first!')
                  }
              }
            };
            xhr.send();
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function() {
              //console.log('User signed out.');
            });
        });
});