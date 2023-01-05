Feature: Login and register
    As a user,
    I want to connect to the app

    Scenario: Login succeed

        Given i am on the Login page
        When i put my username and my password
        And I click on the "Login" button
        Then I shoud be connected to the app

    Scenario: Login as a admin

        Given i am on the Login page
        When i put my username and my password
        And I click on the "Login" button
        And my role is "admin"
        Then I shoud be connected to the app as an admin

    Scenario: Login failed

        Given i am on the Login page
        When I enter an incorrect username or password
        And I click on the "Login" button
        Then I should see an error message


    Scenario: Signup suceed

        Given i am on the Signup page
        When i enter my firstname ,lastname , username and password
        And I click on the Signup button
        Then I shoud be connected to the app

    Scenario: Signup failed

        Given i am on the Signup page
        When i enter my firstname ,lastname , username and password
        And I click on the Signup button
        Then I should see an error message