const express = require("express");
const path = require("path");
const engine = require("ejs-mate");
const nodemailer = require("nodemailer");
const cookieParser = require("cookie-parser");
const { checkHousing, checkData } = require("./public/javascripts/handleJob");

const multer = require("multer");
const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const uploadHandler = multer({ storage: storageEngine });

const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.form;
  if (cookie === undefined) {
    // no: set a new cookie
    var randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie("cookieName", randomNumber, { maxAge: 900000, httpOnly: true });
  } else {
    // yes, cookie was already present
    console.log("cookie exists");
  }
  next(); // <-- important!
});

// use ejs-locals for all ejs templates:
app.engine("ejs", engine);

//Setting view engine to .ejs
app.set("view engine", "ejs");
// Defying a views path
app.set("views", path.join(__dirname, "views"));

//Middleware for retrieving POST forms
app.use(express.urlencoded({ extended: true }));
//Serving static files
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.static(path.join(__dirname, "node_modules/semantic-ui-dropdown"))
);
app.use(
  express.static(path.join(__dirname, "node_modules/semantic-ui-transition"))
);
app.use(express.static(path.join(__dirname, "node_modules/autonumeric")));
app.use(express.static(path.join(__dirname, "node_modules/mathjs")));

// Home route
app.get("/", (req, res) => {
  res.render("home", {
    title: "Best Pôžička - Jednoducha cesta k peniazom",
    isRefinancovanie: false,
    isAutouver: false,
    home: true,
    isBusiness: false,
  });
});
// Refinancovanie route
app.get("/refinancovanie", (req, res) => {
  res.render("refinancovanie", {
    title: "Refinancovanie - Best Pôžička",
    isRefinancovanie: true,
    isAutouver: false,
    home: false,
    isBusiness: false,
  });
});

app.get("/centrala", (req, res) => {
  res.render("centrala", {
    title: "Centrála - Best Pôžička",
    isAutouver: false,
    isRefinancovanie: false,
    home: false,
    isBusiness: false,
  });
});

app.get("/autouver", (req, res) => {
  res.render("autouver", {
    title: "Autoúver - Best Pôžička",
    isRefinancovanie: false,
    isAutouver: true,
    home: false,
    isBusiness: false,
  });
});

app.get("/business", (req, res) => {
  res.render("business", {
    title: "Podnikateľský úver",
    isRefinancovanie: false,
    isAutouver: false,
    home: false,
    isBusiness: true,
  });
});

app.get("/dofinancovanie", (req, res) => {
  res.render("dofinancovanie", {
    title: "Dofinancovanie - Best Pôžička",
    isRefinancovanie: false,
    isAutouver: false,
    home: false,
    isBusiness: false,
  });
});

app.get("/o-best-pozicke", (req, res) => {
  res.render("about", {
    title: "O best pôžičke - Best Pôžička",
    isAutouver: false,
    home: false,
    isRefinancovanie: false,
    isBusiness: false,
  });
});

app.get("/kontakt", (req, res) => {
  res.render("contact", {
    title: "Kontakt - Best Pôžička",
    isAutouver: false,
    home: false,
    isRefinancovanie: false,
    isBusiness: false,
  });
});

app.get("/formCar/rejected", (req, res) => {
  res.render("form/req-rejected-car", {
    sessionData: {
      calcData: req.cookies.calcData,
    },
  });
});

app.get("/form/rejected", (req, res) => {
  res.render("form/req-rejected", {
    sessionData: {
      calcData: req.cookies.calcData,
    },
  });
});

app.get("/form/step-1", (req, res) => {
  res.render("form/index", {
    step: 1,
    sessionData: {
      calcData: req.cookies.calcData,
    },
  });
});

app.get("/form/step-2", (req, res) => {
  res.render("form/step2", {
    step: 2,
    sessionData: {
      calcData: req.cookies.calcData,
      contact: req.cookies.contact,
    },
  });
});

app.get("/form/step-3", (req, res) => {
  res.render("form/step3", {
    step: 3,
    sessionData: {
      calcData: req.cookies.calcData,
      contact: req.cookies.contact,
      companyData: req.cookies.companyData,
    },
  });
});

app.get("/form/step-4", (req, res) => {
  res.render("form/step4", {
    step: 4,
    sessionData: {
      calcData: req.cookies.calcData,
      contact: req.cookies.contact,
      companyData: req.cookies.companyData,
      customerData: req.cookies.customerData,
    },
  });
});

app.get("/form/step-5", async (req, res) => {
  res.render("form/step5", {
    step: 5,
    sessionData: {
      calcData: req.cookies.calcData,
      contact: req.cookies.contact,
      companyData: req.cookies.companyData,
      customerData: req.cookies.customerData,
    },
  });
});

app.get("/formCar/step-1", (req, res) => {
  res.render("form/index-car", {
    step: 1,
    sessionData: {
      calcData: req.cookies.calcData,
    },
  });
});

app.get("/formCar/step-2", (req, res) => {
  res.render("form/step2-car", {
    step: 2,
    sessionData: {
      calcData: req.cookies.calcData,
      contact: req.cookies.contact,
    },
  });
});

app.get("/formCar/step-3", (req, res) => {
  res.render("form/step3-car", {
    step: 3,
    sessionData: {
      calcData: req.cookies.calcData,
      contact: req.cookies.contact,
      companyData: req.cookies.companyData,
    },
  });
});

app.get("/formCar/step-4", (req, res) => {
  res.render("form/step4-car", {
    step: 4,
    sessionData: {
      calcData: req.cookies.calcData,
      contact: req.cookies.contact,
      companyData: req.cookies.companyData,
      customerData: req.cookies.customerData,
    },
  });
});

app.get("/formCar/step-5", async (req, res) => {
  res.render("form/step5-car", {
    step: 5,
    sessionData: {
      calcData: req.cookies.calcData,
      contact: req.cookies.contact,
      companyData: req.cookies.companyData,
      customerData: req.cookies.customerData,
    },
  });
});

app.get("/form/success", async (req, res) => {
  const output = `
     <h3>Údaje z kontaktného formuláru</h3>
             <ul>
                   <li>Záujem o: <b>${req.cookies.calcData.type}</b>, so sumou ${req.cookies.calcData.money} na <b>${req.cookies.calcData.years}</b> a mesačnou splátkou <b>${req.cookies.calcData.interest}€</b></li>
                   <li>Meno a priezvisko <b>${req.cookies.contact.fName}</b> <b>${req.cookies.contact.lName}</b></li>
                   <li>Telefónne číslo: <b>${req.cookies.contact.phoneNum}</b></li>
                   <li>Email: <b>${req.cookies.contact.email}</b></li>
                   <li>Pracovné zaradenie: <b>${req.cookies.contact.job}</b></li>
                   <li>Dosiahnuté vzdelanie: <b>${req.cookies.contact.education}</b></li>
                   <li>Počet detí: <b>${req.cookies.contact.kids}</b></li>
                   <li>Rodné číslo: <b>${req.cookies.contact.bNumber}</b></li>
                   <li>Číslo OP: <b>${req.cookies.contact.id}</b></li>
                   <li>Názov spločnosti alebo IČO: <b>${req.cookies.companyData.companyName}</b></li>
                   <li>Obec: <b>${req.cookies.companyData.city}</b></li>
                   <li>Zamestanine na dobu: <b>${req.cookies.companyData.period}</b></li>
                   <li>Príjem za posledné tri mesiace: <b>${req.cookies.companyData.firstMonth}</b>, <b>${req.cookies.companyData.secondMonth}</b>, <b>${req.cookies.companyData.thirdMonth}</b></li>
                   <li>Od do: <b>${req.cookies.companyData.from}</b>-<b>${req.cookies.companyData.till}</b></li>
                   <li>Vedľajšie príjmy príjmy: <b>${req.cookies.companyData.sideIncome}</b></li>
             </ul>
     <h3>Trvalý pobyt</h3>
             <ul>
                   <li>Ulica a popisné číslo: ${req.cookies.customerData.personStreet}</li>
                   <li>Obec: <b>${req.cookies.customerData.cityCustomer}</b></li>
                   <li>PSČ: <b>${req.cookies.customerData.pscCustomer}</b></li>
                   <li>Typ bývania: <b>${req.cookies.customerData.housing}</b></li>
                   <li>Poštu chcem dostávať na: <b>${req.cookies.customerData.postStreet}</b>, <b>${req.cookies.customerData.postCity}</b>, <b>${req.cookies.customerData.postPsc}</b></li>
             </ul>
     <h3>Rodné priezvisko matky</h3>
             <ul>
                 <li>Rodné priezvisko matky: <b>${req.cookies.customerData.motherSurname}</b></li>
            </ul>
     <h3>Účet</h3>
             <ul>
                    <li>IBAN: ${req.cookies.bankData.iban}</li>
                    <li>Názov banky: ${req.cookies.bankData.bank}</li>
                    <li>Predčíslie účtu: ${req.cookies.bankData.predcislie}</li>
                    <li>Číslo účtu: ${req.cookies.bankData.cisloUctu}</li>
                    <li>Spôsob splácania: ${req.cookies.bankData.kdeZaslat}</li>
             </ul>
`;

  let transporter = nodemailer.createTransport({
    host: "smtp.m1.websupport.sk",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "test@dpmg.dev", // generated ethereal user
      pass: "Hs3H8R=q}&", // generated ethereal password
    },
  });
  await transporter.sendMail({
    from: `${req.cookies.contact.fName} ${req.cookies.contact.lName} <test@dpmg.dev>`, // sender address
    to: `info@bestpozicka.sk`, // list of receivers
    subject: "Nová správa z webovej stránky", // Subject line
    text: "Hello world?", // plain text body
    html: output,
    attachments:
      !req.cookies.attachments.backId && !req.cookies.attachments.frontId
        ? undefined
        : [
            {
              filename: req.cookies.attachments.frontId
                ? req.cookies.attachments.frontId[0].filename
                : undefined,
              path: req.cookies.attachments.frontId
                ? __dirname + "/" + req.cookies.attachments.frontId[0].path
                : undefined,
            },
            {
              filename: req.cookies.attachments.backId
                ? req.cookies.attachments.backId[0].filename
                : undefined,
              path: req.cookies.attachments.backId
                ? __dirname + "/" + req.cookies.attachments.backId[0].path
                : undefined,
            },
          ], // html body
  });
  res.clearCookie("calcData");
  res.clearCookie("contact");
  res.clearCookie("companyData");
  res.clearCookie("attachments");
  res.clearCookie("bankData");
  res.clearCookie("customerData");
  res.render("form/form-success");
});
app.get("/formCar/success", async (req, res) => {
  const output = `
     <h3>Údaje z kontaktného formuláru</h3>
             <ul>
                   <li>Záujem o: <b>${req.cookies.calcData.type}</b>, so sumou ${req.cookies.calcData.money} na <b>${req.cookies.calcData.years}</b> a mesačnou splátkou <b>${req.cookies.calcData.interest}€</b></li>
                   <li>Meno a priezvisko <b>${req.cookies.contact.fName}</b> <b>${req.cookies.contact.lName}</b></li>
                   <li>Telefónne číslo: <b>${req.cookies.contact.phoneNum}</b></li>
                   <li>Email: <b>${req.cookies.contact.email}</b></li>
                   <li>Pracovné zaradenie: <b>${req.cookies.contact.job}</b></li>
                   <li>Dosiahnuté vzdelanie: <b>${req.cookies.contact.education}</b></li>
                   <li>Počet detí: <b>${req.cookies.contact.kids}</b></li>
                   <li>Rodné číslo: <b>${req.cookies.contact.bNumber}</b></li>
                   <li>Číslo OP: <b>${req.cookies.contact.id}</b></li>
                   <li>Názov spločnosti alebo IČO: <b>${req.cookies.companyData.companyName}</b></li>
                   <li>Obec: <b>${req.cookies.companyData.city}</b></li>
                   <li>Zamestanine na dobu: <b>${req.cookies.companyData.period}</b></li>
                   <li>Príjem za posledné tri mesiace: <b>${req.cookies.companyData.firstMonth}</b>, <b>${req.cookies.companyData.secondMonth}</b>, <b>${req.cookies.companyData.thirdMonth}</b></li>
                   <li>Od do: <b>${req.cookies.companyData.from}</b>-<b>${req.cookies.companyData.till}</b></li>
                   <li>Vedľajšie príjmy príjmy: <b>${req.cookies.companyData.sideIncome}</b></li>
             </ul>
     <h3>Trvalý pobyt</h3>
             <ul>
                   <li>Ulica a popisné číslo: ${req.cookies.customerData.personStreet}</li>
                   <li>Obec: <b>${req.cookies.customerData.cityCustomer}</b></li>
                   <li>PSČ: <b>${req.cookies.customerData.pscCustomer}</b></li>
                   <li>Typ bývania: <b>${req.cookies.customerData.housing}</b></li>
                   <li>Poštu chcem dostávať na: <b>${req.cookies.customerData.postStreet}</b>, <b>${req.cookies.customerData.postCity}</b>, <b>${req.cookies.customerData.postPsc}</b></li>
             </ul>
     <h3>Rodné priezvisko matky</h3>
             <ul>
                 <li>Rodné priezvisko matky: <b>${req.cookies.customerData.motherSurname}</b></li>
            </ul>
     <h3>Účet</h3>
             <ul>
                    <li>IBAN: ${req.cookies.bankData.iban}</li>
                    <li>Názov banky: ${req.cookies.bankData.bank}</li>
                    <li>Predčíslie účtu: ${req.cookies.bankData.predcislie}</li>
                    <li>Číslo účtu: ${req.cookies.bankData.cisloUctu}</li>
                    <li>Spôsob splácania: ${req.cookies.bankData.kdeZaslat}</li>
             </ul>
`;

  let transporter = nodemailer.createTransport({
    host: "smtp.m1.websupport.sk",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "test@dpmg.dev", // generated ethereal user
      pass: "Hs3H8R=q}&", // generated ethereal password
    },
  });
  await transporter.sendMail({
    from: `${req.cookies.contact.fName} ${req.cookies.contact.lName} <test@dpmg.dev>`, // sender address
    to: `info@bestpozicka.sk`, // list of receivers
    subject: "Nová správa z webovej stránky", // Subject line
    text: "Hello world?", // plain text body
    html: output,
    attachments:
      !req.cookies.attachments.backId && !req.cookies.attachments.frontId
        ? undefined
        : [
            {
              filename: req.cookies.attachments.frontId
                ? req.cookies.attachments.frontId[0].filename
                : undefined,
              path: req.cookies.attachments.frontId
                ? __dirname + "/" + req.cookies.attachments.frontId[0].path
                : undefined,
            },
            {
              filename: req.cookies.attachments.backId
                ? req.cookies.attachments.backId[0].filename
                : undefined,
              path: req.cookies.attachments.backId
                ? __dirname + "/" + req.cookies.attachments.backId[0].path
                : undefined,
            },
          ], // html body
  });
  res.clearCookie("calcData");
  res.clearCookie("contact");
  res.clearCookie("companyData");
  res.clearCookie("attachments");
  res.clearCookie("bankData");
  res.clearCookie("customerData");
  res.render("form/form-success-car");
});

app.post("/form/step-2", (req, res) => {
  res.cookie("companyData", req.body);
  res.redirect("/form/step-3");
});

app.post("/formCar/step-2", (req, res) => {
  res.cookie("companyData", req.body);
  res.redirect("/formCar/step-3");
});
app.post(
  "/form/step-4",
  uploadHandler.fields([
    { name: "frontId", maxCount: 1 },
    { name: "backId", maxCount: 1 },
  ]),
  (req, res) => {
    res.set("Content-Security-Policy", "img-src 'self'");
    if (req.files) {
      res.cookie("attachments", req.files);
    }
    return res.redirect("/form/step-5");
  }
);

app.post(
  "/formCar/step-4",
  uploadHandler.fields([
    { name: "frontId", maxCount: 1 },
    { name: "backId", maxCount: 1 },
  ]),
  (req, res) => {
    res.set("Content-Security-Policy", "img-src 'self'");
    if (req.files) {
      res.cookie("attachments", req.files);
    }
    return res.redirect("/formCar/step-5");
  }
);
app.post("/form/step-3", (req, res) => {
  checkHousing(req.body);
  res.cookie("customerData", req.body);
  res.redirect("/form/step-4");
});

app.post("/form/step-5", async (req, res) => {
  res.cookie("bankData", req.body);

  res.redirect("/form/success");
});

app.post("/formCar/step-3", (req, res) => {
  checkHousing(req.body);
  res.cookie("customerData", req.body);
  res.redirect("/formCar/step-4");
});

app.post("/formCar/step-5", async (req, res) => {
  res.cookie("bankData", req.body);

  res.redirect("/formCar/success");
});

app.post("/form/step-1", async (req, res) => {
  if (
    req.body.job === "student" ||
    req.body.job === "maternity" ||
    req.body.job === "home-person" ||
    req.body.job === "unemployed"
  ) {
    return res.redirect("/form/rejected");
  }
  const body = req.body;
  checkData(body);
  res.cookie("contact", body);

  res.redirect("/form/step-2");
});
app.post("/formCar/step-1", async (req, res) => {
  if (
    req.body.job === "student" ||
    req.body.job === "maternity" ||
    req.body.job === "home-person" ||
    req.body.job === "unemployed"
  ) {
    return res.redirect("/formCar/rejected");
  }
  const body = req.body;
  checkData(body);
  res.cookie("contact", body);

  res.redirect("/formCar/step-2");
});

app.post("/form", async (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.m1.websupport.sk",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "test@dpmg.dev", // generated ethereal user
      pass: "Lx4:Vd@JB4", // generated ethereal password
    },
  });

  const data = req.body;

  let output;

  if (data.interest) {
    output = `
             <h3>Údaje z kontaktného formuláru</h3>
             <ul>
                   <li>Meno a priezvisko <b>${data.name}</b></li>
                   <li>Telefónne číslo: <b>${data.phoneNumber}</b></li>
                   <li>Email: <b>${data.email}</b></li>
                   <li>Mám záujem o: <b>${data.interest}</b></li>
                   <li>Správa: <b>${data.message}</b></li>
             </ul>
         `;
  } else {
    output = `
             <h3>Údaje z kontaktného formuláru</h3>
             <ul>
                   <li>Meno a priezvisko <b>${data.name}</b></li>
                   <li>Telefónne číslo: <b>${data.phoneNumber}</b></li>
                   <li>Email: <b>${data.email}</b></li>
                   <li>Správa: <b>${data.message}</b></li>
             </ul>
         `;
  }
  // // send mail with defined transport object
  await transporter.sendMail({
    from: `${data.name} <test@dpmg.dev>`, // sender address
    to: `info@bestpozicka.sk`, // list of receivers
    subject: "Nová správa z webovej stránky", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  });
  res.redirect("/form/dakujeme");
});

app.post("/formCar", async (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.m1.websupport.sk",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "test@dpmg.dev", // generated ethereal user
      pass: "Lx4:Vd@JB4", // generated ethereal password
    },
  });

  const data = req.body;

  let output;

  if (data.interest) {
    output = `
             <h3>Údaje z kontaktného formuláru</h3>
             <ul>
                   <li>Meno a priezvisko <b>${data.name}</b></li>
                   <li>Telefónne číslo: <b>${data.phoneNumber}</b></li>
                   <li>Email: <b>${data.email}</b></li>
                   <li>Mám záujem o: <b>${data.interest}</b></li>
                   <li>Správa: <b>${data.message}</b></li>
             </ul>
         `;
  } else {
    output = `
             <h3>Údaje z kontaktného formuláru</h3>
             <ul>
                   <li>Meno a priezvisko <b>${data.name}</b></li>
                   <li>Telefónne číslo: <b>${data.phoneNumber}</b></li>
                   <li>Email: <b>${data.email}</b></li>
                   <li>Správa: <b>${data.message}</b></li>
             </ul>
         `;
  }
  // // send mail with defined transport object
  await transporter.sendMail({
    from: `${data.name} <test@dpmg.dev>`, // sender address
    to: `info@bestpozicka.sk`, // list of receivers
    subject: "Nová správa z webovej stránky", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  });
  res.redirect("/formCar/dakujeme");
});

app.post("/calc", (req, res) => {
  res.clearCookie("calcData");
  res.clearCookie("contact");
  res.clearCookie("companyData");
  res.clearCookie("attachments");
  res.clearCookie("bankData");
  res.clearCookie("customerData");
  res.cookie("calcData", req.body);
  res.redirect("/form/step-1");
});

app.post("/calcCar", (req, res) => {
  res.clearCookie("calcData");
  res.clearCookie("contact");
  res.clearCookie("companyData");
  res.clearCookie("attachments");
  res.clearCookie("bankData");
  res.clearCookie("customerData");
  res.cookie("calcData", req.body);
  res.redirect("/formCar/step-1");
});
app.get("/form/dakujeme", (req, res) => {
  res.render("form/form-dakujeme");
});
app.get("/formCar/dakujeme", (req, res) => {
  res.render("form/form-dakujeme-car");
});
// Listening to a port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
