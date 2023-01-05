//dépendance
const { Given , When , Then } = require('cucumber');


//GIVEN 
Given('i am on the Login page', function () {
    console.log("window.location.href :'/login'")    

});


Given('i am on the Signup page', function () {
    console.log("window.location.href :'/signup'")    


});

//WHEN 
When('i put my username and my password', function () {
    const response = {
        methods : "POST",
        headers : 'Content-Type : application/json',
        body : '{username: username , password: password}'
    }
    return response
});

When('i enter my firstname ,lastname , username and password', function () {
    const response = {
        methods : "POST",
        headers : 'Content-Type : application/json',
        body : '{username: username , password: password, firstname: firstname , lastname: lastname}'
    } 
    return response     
});

When('I enter an incorrect username or password', function () {
    const response = {
        methods : "POST",
        headers : 'Content-Type : application/json',
        body : '{message : invalid username or password}'
    }
    return response

});

//AND 

When('I click on the {string} button', function(string){
    console.log("window.location.href " + string )    
})

When('I click on the Signup button', function(){
    console.log("window.location.href :'/signup'")    
})

When('my role is {string}', function(string){
    console.log("{username: username , password: password, role : " + string + "}" )
})


//THEN 
Then('I shoud be connected to the app', function () {
  console.log("window.location.href :'/'")
  const response = {
    methods : "GET",
    status : 200 ,
    headers : 'Content-Type : application/json',
    body : '{username: username , password: password}'
}
return response


});


Then('I shoud be connected to the app as an admin', function () {
    console.log("window.location.href :'/admin'")    
    const response = {
        methods : "GET",
        status : 200 ,
        headers : 'Content-Type : application/json',
        body : '{username: username , password: password, role: "admin"}'
    }
    return response

});

Then('I should see an error message', function () {
  const response = {
    methods : "GET",
    status : 404 ,
    headers : 'Content-Type : application/json',
    body : '{message : invalid username or password}'
}
return response
});

