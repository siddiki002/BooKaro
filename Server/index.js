const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const customerModel = require("./Model/Customer.js");
const busModel = require("./Model/buses.js");
const matchesModel = require("./Model/matches.js");
const enclosureModel = require("./Model/enclosure.js");
const cricketTicketModel = require("./Model/cricketTicket.js");
const adminModel = require("./Model/admin.js");
// const ticketModel = require("./Model/cricketTicket.js");

const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: `${process.env.EMAIL}`,
    pass: `${process.env.PASSWORD}`,
  },
});
app.use(express.json());
app.use(cors());

mongoose.connect(
  `${process.env.MongoDB_Key}`,
  {
    useNewUrlParser: true,
  }
);

app.post("/signup", async (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const Password = bcrypt.hashSync(req.body.Password, 8);
  const email = req.body.email;
  const token = jwt.sign({ email: email }, "ammar-secret-key");
  const customer = customerModel({
    fname: fname,
    lname: lname,
    Password: Password,
    email: email,
    confirmationCode: token,
  });
  try {
    customer.save();

    transport
      .sendMail({
        from: "k200177@nu.edu.pk",
        to: email,
        subject: "Confirm your account",
        html: `<h1> Email Confirmation </h1>
        <h2>Hello ${fname}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:5001/confirm/${token}> Click here</a>
        </div>`,
        
      })
      .catch((err) => console.log(`Could not send email`));
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

app.get("/bus", async (req, res) => {
  try {
    busModel.find().then(
      (foundBuses) => {
        res.send(foundBuses);
      },
      (error) => {
        res.send(error);
      }
    );
  } catch (err) {
    console.log("Invalid request");
    res.sendStatus(404);
  }
});

app.get("/cricket", async (req, res) => {
  try {
    matchesModel.find().then(
      (foundMatches) => {
        res.send(foundMatches);
      },
      (error) => {
        console.log(error);
        res.sendStatus(404);
      }
    );
  } catch {
    res.sendStatus(404);
  }
});

app.get("/enclosure", async (req, res) => {
  try {
    enclosureModel.find().then(
      (foundEnclosures) => {
        res.send(foundEnclosures);
      },
      (error) => {
        console.log(error);
        res.sendStatus(404);
      }
    );
  } catch {
    res.sendStatus(404);
  }
});

app.post("/signin",  async (req, res) => {
  // var promise = Promise.resolve()
  // pass = bcrypt.compareSync(req.body.Password , '$2b$08$KTfuiB524RMoRdPy5UB9Juq.bve8ZtN3RfunmBaS13wFgSZ9KQVJi')
  // console.log(pass)
  customerModel
    .find()
    .then(
      (response) => {
        // console.log(response);
        // var promise = Promise.resolve()        
        for (let i=0 ; i < response.length ; i++){

          temp = response[i]
          passwordValid = bcrypt.compareSync(req.body.Password , temp.Password)
          console.log(passwordValid)
          console.log(temp.email)
          console.log(req.body.email)
          console.log(typeof(passwordValid))
          if (temp.email == req.body.email &&  passwordValid == true){
            console.log(temp)
            return res.send(temp)
          }
          // return promise
        }
        return res.send({})
        // return promise
      }
    )
    .catch((error) => {
      console.log(error)
      res.sendStatus(404)
    })
    // return promise
});

app.post("/user", async (req, res) => {
  customerModel
    .find({
      _id: req.body._id,
    })
    .then(
      (response) => {
        res.send(response);
      },
      (err) => {
        res.sendStatus(404); //not found
      }
    );
});

app.post("/user/update", async (req, res) => {
  console.log(req.body);
  customerModel
    .findOneAndUpdate(
      {
        _id: req.body._id,
      },
      {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        Password: req.body.Password,
      }
    )
    .then(
      (response) => {
        res.send(response);
      },
      (err) => {
        res.sendStatus(404); //not found
      }
    );
});

app.post("/payment", async (req, res) => {
  console.log(req.body.ticket);
  if (req.body.ticket.type === "bus") {
    busModel.findOne({ _id: req.body.ticket.key }).then(
      (foundBus) => {
        console.log(foundBus);
        foundBus.left = foundBus.left - req.body.ticket.tickets;
        // foundBus.save();
        customerModel.findOne({ _id: req.body.ticket._id }).then(
          (foundCustomer) => {
            console.log(foundCustomer);
            foundCustomer.busTicket.push(foundBus._id);
            Promise.all([foundBus.save(), foundCustomer.save()]).then(
              (saved) => {
                res.sendStatus(200);
              }
            );
            // foundCustomer.save()
          },
          (err) => {
            res.sendStatus(404);
          }
        );
        // res.sendStatus(200);
      },
      (err) => {
        res.sendStatus(404);
      }
    );
  } else if (req.body.ticket.type === "cricket") {
    receivedTicket = req.body.ticket;
    console.log(receivedTicket._id);
    enclosureModel.findOne({ _id: receivedTicket.enclosure.key }).then(
      (foundEnclosure) => {
        console.log(foundEnclosure);
        foundEnclosure.left = foundEnclosure.left - receivedTicket.tickets;
        foundEnclosure.save();
        const ticket = new matchesModel({
          team1: receivedTicket.team1,
          team2: receivedTicket.team2,
          date: receivedTicket.date,
          time: receivedTicket.time,
          venue: receivedTicket.venue,
          city: receivedTicket.city,
          enclosure: foundEnclosure._id,
        });
        console.log(ticket);
        Promise.all([ticket.save()]).then(
          (savedTicket) => {
            customerModel.findOne({ _id: receivedTicket._id }).then(
              (foundCustomer) => {
                if (foundCustomer) {
                  // console.log(foundCustomer)
                  console.log(savedTicket._id);
                  foundCustomer.cricketTicket.push(savedTicket[0]._id);
                  console.log(foundCustomer);
                  foundCustomer.save();
                  // Promise.one(foundCustomer.save())
                  res.sendStatus(200);
                } else {
                  return null;
                }
              },
              (err) => {
                res.sendStatus(404);
              },
              (err) => {
                res.sendStatus(404);
              }
            );
          },
          (err) => {
            res.sendStatus(404);
          }
        );
        // res.sendStatus(200)
      },
      (err) => {
        res.sendStatus(404);
      },
      (err) => {
        console.log("Enclosure not found");
        res.sendStatus(404);
      }
    );
  }
});

app.get("/user/ticket/:id", async (request, response) => {
  try {
    customerModel
      .findOne({ _id: request.params.id })
      .then((foundCustomer) => {
        const busTickets = [];
        const cricketTickets = [];

        const busPromises = foundCustomer.busTicket.map((busId) => {
          return busModel.findOne({ _id: busId }).then((foundBus) => {
            console.log(`Found Bus ticket is\n`);
            console.log(foundBus);
            busTickets.push(foundBus);
          });
        });

        const cricketPromises = foundCustomer.cricketTicket.map((cricketId) => {
          return matchesModel
            .findOne({ _id: cricketId })
            .then((foundCricket) => {
              console.log(`Found Cricket ticket is\n`);
              console.log(foundCricket);
              cricketTickets.push(foundCricket);
            });
        });

        Promise.all([...busPromises, ...cricketPromises])
          .then(() => {
            response.send({
              busTickets: busTickets,
              cricketTickets: cricketTickets,
            });
          })
          .catch((err) => {
            console.log(err);
            response.sendStatus(404);
          });
      })
      .catch((err) => {
        console.log("Error in finding the customer");
        console.log(request.params.id);
        response.sendStatus(404);
      });

    // customerModel.findOne({_id : request.params.id}).then((foundCustomer) => {
    //   const busTickets = [];
    //   const cricketTickets = [];
    //   for (let i =0 ; i<foundCustomer.busTicket.length ; i++){
    //     busModel.findOne({_id : foundCustomer.busTicket[i]}).then((foundBus) => {
    //       console.log(`Found Bus ticket is\n`)
    //       console.log(foundBus)
    //       busTickets.push(foundBus)
    //     } , (err) => {
    //       console.log(err)
    //     })
    //   }
    //   for (let i = 0 ; i<foundCustomer.cricketTicket.length ; i++){
    //     cricketTicketModel.findOne({_id : foundCustomer.cricketTicket[i]}).then((foundCricket) => {
    //       console.log(`Found Cricket ticket is\n`)
    //       console.log(foundCricket)
    //       cricketTickets.push(foundCricket)
    //     } , (err) => {
    //       console.log(err)
    //     });
    //   }
    //   // console.log(busTickets)
    //   // console.log(cricketTickets)
    //   response.send({busTickets : [busTickets] , cricketTickets : [cricketTickets]})
    // } , (err) => {
    //   console.log('Error in finding the customer')
    //   console.log(request.params.id)
    //   response.sendStatus(404)
    // })
  } catch (err) {
    console.log(err);
    response.sendStatus(404);
  }
});

app.get("/confirm/:confirmationCode", async (req, res) => {
  try {
    const token = req.params.confirmationCode;
    customerModel.findOne({ confirmationCode: token }).then(
      (response) => {
        if(!response){
          return res.sendStatus(404)
        }
        response.Status = "Active";
        response.save();
        res.status(200).send({msg : 'Account registered successfully'})
        // res.send({message : 'Thank you for confirming your email. You can click on below button to proceed to login'});
        // console.log(response)
      }
    ).catch((error)=>{
      console.log("Error", error)
    })
  } catch (err) {
    console.log(err);
  }
});

app.post("/getBusTicket", async (request, response) => {
  try {
    // console.log(request.body)
    // if (request.body.email === "admin") {
    busModel
      .find({
        _id: request.body._id,
      })
      .then((res) => {
        // console.log(res)
        console.log(res);
        response.send(res[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    // } else {
    //   response.sendStatus(404);
    // }
  } catch (err) {
    console.log("ID not valid");
    response.sendStatus(404);
  }
});

app.post("/admin/getDataBus", async (request, response) => {
  let allAdmins = await adminModel.find();
  // console.log(allAdmins);

  for (let i = 0; i < allAdmins.length; i++) {
    try {
      if (request.body.id == allAdmins[i]._id.toString()) {
        const buses = [];
        busModel.find().then(
          (foundBuses) => {
            buses.push(...foundBuses);
            Promise.all([...buses]).then(() => {
              console.log(buses);
              response.send({ buses: buses });
            });
          },
          (err) => {
            console.log("Error occured");
            response.sendStatus(404);
          }
        );
        break;
      }
    } catch (err) {
      console.log("ID not valid");
      response.sendStatus(404);
    }
  }
});

app.post("/getCricketTicket", async (request, response) => {
  try {
    const { _id } = request.body;

    // Retrieve all matches
    const allMatches = await matchesModel.find();
    console.log("All Matches:", allMatches);

    // Find a specific cricket ticket by ID
    const foundCricket = await matchesModel.findById(_id);
    console.log("Found Cricket Ticket:", foundCricket);

    if (foundCricket) {
      response.send(foundCricket);
    } else {
      response.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    response.sendStatus(500);
  }
});

app.post("/admin/getDataCricket", async (request, response) => {
  let allAdmins = await adminModel.find();
  // console.log(allAdmins);

  for (let i = 0; i < allAdmins.length; i++) {
    try {
      console.log(request.body);
      if (request.body.id == allAdmins[i]._id.toString()) {
        const cricket = [];
        matchesModel.find().then(
          (foundCricket) => {
            cricket.push(...foundCricket);
            Promise.all([...cricket]).then(() => {
              console.log(cricket);
              response.send({ cricket: cricket });
            });
          },
          (err) => {
            console.log(err);
            response.sendStatus(404);
          }
        );
        break;
      }
    } catch (err) {
      console.log("ID not valid");
      response.sendStatus(404);
    }
  }
});

app.post("/admin/create/cricket", async (request, response) => {
  try {
    const allAdmins = await adminModel.find();
    const adminId = request.body.id;

    const isAdmin = allAdmins.some((admin) => admin._id.toString() === adminId);

    if (!isAdmin) {
      response.sendStatus(404);
      return;
    }

    const receivedTicket = request.body.ticket;
    const ticket = new matchesModel({
      team1: receivedTicket.team1,
      team2: receivedTicket.team2,
      time: receivedTicket.time,
      date: receivedTicket.date,
      venue: receivedTicket.venue,
      city: receivedTicket.city,
    });

    await ticket.save();

    console.log("Ticket saved successfully");
    response.sendStatus(200);
  } catch (err) {
    console.log(err);
    response.sendStatus(500);
  }
});

app.post("/admin/create/bus", async (request, response) => {
  try {
    const allAdmins = await adminModel.find();
    const adminId = request.body.id;

    const isAdmin = allAdmins.some((admin) => admin._id.toString() === adminId);

    if (!isAdmin) {
      response.sendStatus(404);
      return;
    }

    const receivedTicket = request.body.ticket;
    const bus = new busModel({
      pickup: receivedTicket.pickup,
      arrival: receivedTicket.arrival,
      date: receivedTicket.date,
      pickup_time: receivedTicket.pickup_time,
      arrival_time: receivedTicket.arrival_time,
      seats: receivedTicket.seats,
      left: receivedTicket.seats,
      price: receivedTicket.price,
    });

    await bus.save();

    console.log("Ticket saved successfully");
    response.sendStatus(200);
  } catch (err) {
    console.log(err);
    response.sendStatus(500);
  }
});

app.post("/admin/update/cricket", async (request, response) => {
  console.log(request.body);

  const allAdmins = await adminModel.find();
  const adminId = request.body.admin;

  const isAdmin = allAdmins.some((admin) => admin._id.toString() === adminId);

  if (!isAdmin) {
    response.sendStatus(404);
    return;
  }

  const receivedTicket = request.body.ticket;
  matchesModel
    .findOneAndUpdate(
      {
        _id: request.body._id,
      },
      {
        team1: receivedTicket.team1,
        team2: receivedTicket.team2,
        time: receivedTicket.time,
        date: receivedTicket.date,
        venue: receivedTicket.venue,
        city: receivedTicket.city,
      }
    )
    .then(
      (res) => {
        response.send(res);
      },
      (err) => {
        response.sendStatus(404); //not found
      }
    );
});

app.post("/admin/update/bus", async (request, response) => {
  console.log(request.body);

  const allAdmins = await adminModel.find();
  const adminId = request.body.admin;

  const isAdmin = allAdmins.some((admin) => admin._id.toString() === adminId);

  if (!isAdmin) {
    response.sendStatus(404);
    return;
  }

  const receivedTicket = request.body.ticket;
  busModel
    .findOneAndUpdate(
      {
        _id: request.body._id,
      },
      {
        pickup: receivedTicket.pickup,
        arrival: receivedTicket.arrival,
        date: receivedTicket.date,
        pickup_time: receivedTicket.pickup_time,
        arrival_time: receivedTicket.arrival_time,
        seats: receivedTicket.seats,
        price: receivedTicket.price,
      }
    )
    .then(
      (res) => {
        response.send(res);
      },
      (err) => {
        response.sendStatus(404); //not found
      }
    );
});

app.post("/signin/admin", async (request, response) => {
  try {
    // console.log(request.body)
    if (request.body.email === "admin") {
      adminModel
        .find({
          username: request.body.email,
          password: request.body.Password,
        })
        .then((res) => {
          // console.log(res)
          response.send(res[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      response.sendStatus(404);
    }
  } catch (err) {
    console.log("ID not valid");
    response.sendStatus(404);
  }
});

app.post("/getAdmin", async (request, response) => {
  try {
    // console.log(request.body)
    // if (request.body.email === "admin") {
    adminModel
      .find({
        _id: request.body._id,
      })
      .then((res) => {
        // console.log(res)
        console.log(res);
        response.send(res[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    // } else {
    //   response.sendStatus(404);
    // }
  } catch (err) {
    console.log("ID not valid");
    response.sendStatus(404);
  }
});

app.post("/admin/update", async (req, res) => {
  console.log(req.body);
  adminModel
    .findOneAndUpdate(
      {
        _id: req.body._id,
      },
      {
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.email,
        Password: req.body.Password,
      }
    )
    .then(
      (response) => {
        res.send(response);
      },
      (err) => {
        res.sendStatus(404); //not found
      }
    );
});

app.listen(5001, () => {
  console.log(`Listening to port 5001`);
});
