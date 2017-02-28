function onSignIn(googleUser){
            id_token = googleUser.getAuthResponse().id_token;
            //console.log(id_token);
            var profile = googleUser.getBasicProfile();
            var email = profile.getEmail();
       //     var domain = email.substring(email.indexOf("@")+1);
            console.log('ID: ' + profile.getId());
            console.log('Name: ' + profile.getName());
            console.log('Domain: ' + domain);
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
            xhr.send(JSON.stringify({idtoken: id_token, domain: domain}));
            console.log(domain);
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

$('#clients').prop('disabled',true);
$('#my-signin2').hide();
//Signing In 
$('#cities').click(function(){
     $('#my-signin2').hide();
});

var x = new XMLHttpRequest();
  x.onload = function(){

    if(x.readystate = XMLHttpRequest.DONE){

      if(x.status===200||x.status===304){
        console.log(x.responseText);
        var city = JSON.parse(x.responseText);
        console.log(city.length);

        for(i=0;i<city.length;i++){
             $('#cityDrop').append('<li class="cityList" id="temp">'+city[i].name+'</li>');
             $('#temp').attr('id',city[i].id);
        } 
       
        //city request
         $(".cityList").click(function(){
            $('#cities').html(this.innerHTML);
             $('.uniList').remove();
          var y = new XMLHttpRequest();
          y.onload = function(){

            if(y.readystate = XMLHttpRequest.DONE){

              if(y.status===200||y.status===304){

                console.log(y.responseText);
                var client = JSON.parse(y.responseText);
                console.log(client.length);

                for(i=0;i<client.length;i++){
                    $('#uniDrop').append('<li class="uniList" id="temp">'+client[i].name+'</li>');
                    $('#temp').attr('id',client[i].domain);
                } 
                  $('#clients').prop('disabled',false);
                  $('.uniList').click(function(){
                    $('#clients').html(this.innerHTML);
                     domain = this.id; 
                     $('#my-signin2').fadeIn();
                     console.log(domain);
                  });
               }

                else if(y.status===500){
                  //do something
               }
            }
       }

      var cid = this.id;
      console.log(cid);
      y.open('GET','http://localhost:8082/get-clients?id='+cid);
      y.setRequestHeader('Content-Type', 'application/json');
      y.send();

         });

      }
      else if(x.status===500){
        //do something
      }
    } 
  }
  x.open('GET','http://localhost:8082/get-cities');
  x.setRequestHeader('Content-Type', 'application/json');
  x.send();
 
  


//Signing out
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
         