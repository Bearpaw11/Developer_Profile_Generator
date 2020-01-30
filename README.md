# Developer_Profile_Generator
This is a program that will build a Git Hub Profile PDF using Node.js

On the terminal line user enters node index.js to start program

User selects favorite color from the list and then enters their Git Hub user name. (this is using the inquirer module from npm)

From here the program uses the github api to fetch the github user information and then builds the html.

Using the electron NPM a PDF of all the user information is generated.

On the PDF the User location, Git Hub profile and blog are all clickable and with take you to that particular page. 

