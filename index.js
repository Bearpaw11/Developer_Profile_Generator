var inquirer = require('inquirer');
var fs = require("fs")
var axios = require("axios")
var generateHTML = require("./generateHTML")
const client_id = "Iv1.33f307defd13a715"
const client_secret = "ef0358ffa6e546f5238758f7e59688001624da77"
const convertFactory = require('electron-html-to');



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
                    
                }
            })
            console.log(html)

            var conversion = convertFactory({
                converterPath: convertFactory.converters.PDF
              });
               
              conversion({ html: '<h1>Hello World</h1>' }, function(err, result) {
                if (err) {
                  return console.error(err);
                }
               
                console.log(result.numberOfPages);
                console.log(result.logs);
                result.stream.pipe(fs.createWriteStream('anywhere.pdf'));
                conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
              });
        
            

        });
     


    })




