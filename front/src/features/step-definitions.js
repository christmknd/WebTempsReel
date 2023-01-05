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
When('i put my email and my password', function () {
    console.log('response : method: post , headers : { "Content-Type": "application/json" } , body :JSON.stringify({ username: username, password: password})')
});

When('i enter my firstname ,lastname , email and password', function () {
    console.log('response : method: post , headers : { "Content-Type": "application/json" } , body :JSON.stringify({ username: username, password: password , firstname: firstname,lastname: lastname })')
      
});

When('I enter an incorrect email or password', function () {
    console.log("invalid username or password");

});

//AND 

When('I click on the {string} button', function(string){
    console.log("window.location.href " + string)    
})

When('I click on the Signup button', function(){
    console.log("window.location.href :'/signup'")    
})

When('my role is {string}', function(string){
    console.log("{username: username , password: password, role : " + string )
})


//THEN 
Then('I shoud be connected to the app', function () {
  console.log("window.location.href :'/'")
  

});


Then('I shoud be connected to the app as an admin', function () {
    console.log("window.location.href :'/'")    
    const response = {
        methods : "POST",
        status : 200 ,
        headers : 'Content-Type : application/json',
        body : '{username: username , password: password, role: "admin"}'
    }
    return response

});

Then('I should see an error message', function () {
  const response = {
    methods : "POST",
    status : 404 ,
    headers : 'Content-Type : application/json',
    body : '{message : invalid username or password}'
}
return response
});

