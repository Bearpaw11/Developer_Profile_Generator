var inquirer = require('inquirer')
const path = require("path");
var fs = require('fs')
var axios = require('axios')
var generateHTML = require('./generateHTML')
const client_id = 'Iv1.33f307defd13a715'
const client_secret = 'ef0358ffa6e546f5238758f7e59688001624da77'
// const pdf = require('html-pdf');
// const HTMLToPDF = require('html-to-pdf');
const convertFactory = require('electron-html-to')
inquirer
  .prompt([
    {
      type: 'list',
      message: 'what is you favorite color',
      choices: ['blue', 'green', 'pink', 'red'],
      name: 'color'
    },
    {
      type: 'input',
      message: 'what is you GitHub Username',
      name: 'username'
    }
  ])
  .then(function (info) {
    var color = info.color
    var user = info.username
    console.log(info)
    axios
      .get(
        `https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`
      )
      .then(result => {
        console.log(result.data)
        // api call
        axios
          .get(
            `https://api.github.com/users/${user}/repos?client_id=${client_id}&client_secret=${client_secret}`
          )
          .then(stars => {
            console.log(stars.data)
            var starTotal = 0
            for (var i = 0; i < stars.data.length; i++) {
              starTotal = starTotal + stars.data[i].stargazers_count
            }
            var data = { color, starTotal, ...result.data }
            var html = generateHTML(data)
            fs.writeFile('test.html', html, function (err) {
              if (err) {
                console.log(err)
              } else {
                console.log('success')
                //var html1 = fs.readFileSync('test.html', 'utf8');
                //    var options = { format: 'A4' };
                //     //console.log(html1)
                //     pdf.create(html, options).toFile('./github.pdf', function(err, res) {
                //       if (err) return console.log(err);
                //       console.log(res); // { filename: '/app/businesscard.pdf' }
              }
            })
            const conversion = convertFactory({
              converterPath: convertFactory.converters.PDF
            })
            conversion({ html }, function (err, result) {
              if (err) {
                return console.error(err)
              }
              result.stream.pipe(
                fs.createWriteStream(path.join(__dirname, 'github.pdf'))
              )
              conversion.kill()
            })
            // const htmlToPDF = new HTMLToPDF(`<div>Hello</div>`);
            //   htmlToPDF.convert()
            //     .then((buffer) => {
            //         fs.writeFile("test.pdf", buffer, function(err) {
            //             if (err) {
            //                 console.log(err)
            //             } else {
            //                 console.log("great")
            //             }
            //         })
            //       // do something with the PDF file buffer
            //     })
            //     .catch((err) => {
            //       // do something on error
            //     });
          })
      })
  })

