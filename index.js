var inquirer = require('inquirer');
var fs = require("fs")
var axios = require("axios")
var generateHTML = require("./generateHTML")
const client_id = "Iv1.33f307defd13a715"
const client_secret = "ef0358ffa6e546f5238758f7e59688001624da77"
const pdf = require('html-pdf');
const googleKey = "AIzaSyD3sr24Y6WTkxGLl4RB7QlZsWoocUb5hfQ"


inquirer
    .prompt([{
            type: "list",
            message: "what is you favorite color",
            choices: [
                "blue",
                "green",
                "pink",
                "red",
            ],
            name: "color"
        },
        {
            type: "input",
            message: "what is you GitHub Username",
            name: "username",
        }
    ])
    .then(function(info) {

        var color = info.color
        var user = info.username
        console.log(info)

        axios.get(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`)

        .then(result => {

            console.log(result.data)
            var data = { color, ...result.data }

            var html = generateHTML(data)
            fs.writeFile("test.html", html, function(err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("success")
                    var html1 = fs.readFileSync('test.html', 'utf8');
                    var options = { format: 'Letter' };
                    console.log(html1)
                    pdf.create(html1, options).toFile('./github.pdf', function(err, res) {
                      if (err) return console.log(err);
                      console.log(res); // { filename: '/app/businesscard.pdf' }
                    });
                    
                }
            })
            // console.log(html)

        
            

         });
     


    })




