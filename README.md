Project made in React

[API Documentation and App requirements](https://prueba-resuelve.herokuapp.com/frontend)


## Running the Project
  

Clone this repo to your machine.

>This project is already built, so you can go to the folder `build` and serve it with your favorite http server. You can then skip to `Using the App`. If you want instead to run the code, keep reading.



  (Assuming `npm` is installed)

You need to install all the `npm` packages, to do this, please run the next command while being in the root folder:

  

`npm install`

  

Then we can go ahead and run the project using

`npm start`

The local server will start at `localhost:3000`, and we can start using the app.

## Using the App

This is the screen you will see if you run the project successfully:

![Imgur](https://i.imgur.com/4DgBCX0.png)

We can identify some main aspects here:

 1. Login hyperlink

	This will take you back to the Login screen.
 2. Language Selector

	You can change the language of the app here, just click it and select either English or Spanish.
 3. Login form

	Here you can submit the client info (email and password) to login. It will show you an error if any field is empty, or if the info submitted is wrong.
4. Admin Login redirect

	It will redirect you to the admin login screen. Which is similar but exclusive to admins. **Client info won't work on admin login, and admin info won't work on client login**.
	

### Client Path

After you login with the proper client info, you will see a screen like this

![Imgur](https://i.imgur.com/T3xj9ou.png)

 1. Sign Out button

	Like the name says, it will sign you out and redirect you to the login screen
2. Client info and movements table

	You can find the client's name, email and a table of their latest movements. Which you can sort by any of its columns.
3. Pagination

    The movement info will be divided into multiple pages, here you can navigate through all of them.
4. Currency button

	You can change the currency if you want, between USD and MXN.


### Admin Path

You will see a screen like this if you log in from the Admin Login page.

![Imgur](https://i.imgur.com/em6E9sk.png)

1. Users List

	This will take you to the main admin screen, which is a list of all the users.
2. Users Table

	Here you can find a list of all the clients in the system. You can see their names, email addresses and if they are active or not. And if you click on their names, it will take you to that client movements screen (see `Client Movements (admin)`).
3. Pagination

	All the info is divided into multiple pages, using this pagination will help you browse through all the pages easily.

### Client Movements (admin)

You can find this screen when you select a client to see their movements

![Imgur](https://i.imgur.com/6o7EHya.png)

It is important to note here that this is screen is almost identical to what a Client would see when they log in, so you can remit to that section to know about what you can find here.
