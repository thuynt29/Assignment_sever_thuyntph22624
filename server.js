var express = require('express');
var app = express();
var http = require('http');
//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/Login", function (req, res) {
  let quates = [""];
  res.render("Login.ejs", { result: quates });
})
app.get("/Signup", function (req, res) {
  let quates = [""];
  res.render("Signup.ejs", { result: quates });
})
app.get("/Admin", function (req, res) {
  let quates = [""];
  res.render("Admin.ejs", { result: quates });
})
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("Image"));
app.listen(8000);
//Mongo
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Database')
  .then(() => console.log('Connected!'));
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Image/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  }
});
var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log(file);
    if (file.mimetype == "image/bmp" || file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" ||
      file.mimetype == "image/gif") {
      cb(null, true)
    } else {
      return cb(new Error('Only image are allowed!'))
    }
  }
}).single("txtanh");
// Models //
var Banh = require("./model");
app.get("/add", function (req, res) {
  res.render("add");
})
app.post("/add", function (req, res) {
  // res.send("Hi");
  // Upload file
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      //console.log("A Multer error occurred when uploading.");
      res.json({ "kq": 0, "erMsg": "A Multer error occurred when uploading." });
    } else if (err) {
      res.json({ "kq": 0, "erMsg": "An unknown error occurred when uploading." + err });
      //console.log("An unknown error occurred when uploading." + err);
    } else {
      // Save Mongo (req.file.filename)
      var banh = Banh({
        Masp: req.body.txtmsp,
        Dongia: req.body.txtdg,
        Anh: req.file.filename,
        Loaisp: req.body.txtlsp,
        Makh: req.body.txtmkh,
        Mausac: req.body.txtms,
        Tenkh: req.body.txttkh,
        Tensp: req.body.txttsp
      });
      banh.save(function (err) {
        if (err) {
          res.json({ "kq": 0, "errMsg": err });
        } else {
          res.redirect("./list");
        }
      })
    }
  });
})
// Danh sách
app.get("/list", function (req, res) {
  Banh.find(function (err, data) {
    if (err) {
      res.json({ "kq": 0, "errMsg": err });
    } else {
      res.render("list", { danhsach: data });
    }
  })
});
// Sửa

app.get("/edit/:id", function (req, res) {
  Banh.findById(req.params.id, function (err, char) {
    if (err) {
      res.json({ "kq": 0, "errMsg": err });
    } else {
      console.log(char);
      res.render("edit", { nhanvat: char });
    }
  })
});
app.post("/edit", function (req, res) {
  upload(req, res, function (err) {
    if (!req.file) {
      Banh.updateOne({ _id: req.body.IDChar }, {
        Masp: req.body.txtmsp,
        Dongia: req.body.txtdg,
        Loaisp: req.body.txtlsp,
        Makh: req.body.txtmkh,
        Mausac: req.body.txtms,
        Tenkh: req.body.txttkh,
        Tensp: req.body.txttsp
      }, function (err) {
        if (err) {
          res.json({ "kq": 0, "errMsg": err });
        } else {
          res.redirect("./list");
        }
      });
    } else {
      if (err instanceof multer.MulterError) {
        res.json({ "kq": 0, "erMsg": "A Multer error occurred when uploading." });
      } else if (err) {
        res.json({ "kq": 0, "erMsg": "An unknown error occurred when uploading." + err });
      } else {
        Banh.updateOne({ _id: req.body.IDChar }, {
          Masp: req.body.txtmsp,
          Dongia: req.body.txtdg,
          Anh: req.file.filename,
          Loaisp: req.body.txtlsp,
          Makh: req.body.txtmkh,
          Mausac: req.body.txtms,
          Tenkh: req.body.txttkh,
          Tensp: req.body.txttsp
        }, function (err) {
          if (err) {
            res.json({ "kq": 0, "errMsg": err });
          } else {
            res.redirect("./list");
          }
        });
      }
    }
  }
  );
})
app.get("/delete/:id", function (req, res) {
  Banh.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      res.json({ "kq": 0, "errMsg": err });
    } else {
      res.redirect("../list");
    }
  })
})