var State = require("../models/State");
var Keys = require("../config/keys");
var mongoose = require("mongoose");

mongoose.connect(Keys.mongodbDevlopment.dbURI);

var states = [
  new State({
    id: "AN",
    name: "Andaman and Nicobar"
  }),
  new State({
    id: "AP",
    name: "Andhra Pradesh"
  }),
  new State({
    id: "AR",
    name: "Arunachal Pradesh"
  }),
  new State({
    id: "AS",
    name: "Assam"
  }),
  new State({
    id: "BI",
    name: "Bihar"
  }),
  new State({
    id: "CH",
    name: "Chandigarh"
  }),
  new State({
    id: "CG",
    name: "Chattisgarh"
  }),
  new State({
    id: "DN",
    name: "Dadra and Nagar Haveli"
  }),
  new State({
    id: "DD",
    name: "Daman and Diu"
  }),
  new State({
    id: "GO",
    name: "Goa"
  }),
  new State({
    id: "GJ",
    name: "Gujarat"
  }),
  new State({
    id: "HR",
    name: "Haryana"
  }),
  new State({
    id: "HP",
    name: "Himachal Pradesh"
  }),
  new State({
    id: "JK",
    name: "Jammu and Kashmir"
  }),
  new State({
    id: "JR",
    name: "Jharkhand"
  }),
  new State({
    id: "KK",
    name: "Karnataka"
  }),
  new State({
    id: "KL",
    name: "Kerala"
  }),
  new State({
    id: "LD",
    name: "Lakshadweep"
  }),
  new State({
    id: "MP",
    name: "Madhya Pradesh"
  }),
  new State({
    id: "MH",
    name: "Maharashtra"
  }),
  new State({
    id: "MN",
    name: "Manipur"
  }),
  new State({
    id: "MG",
    name: "Meghalaya"
  }),
  new State({
    id: "MZ",
    name: "Mizoram"
  }),
  new State({
    id: "NG",
    name: "Nagaland"
  }),
  new State({
    id: "DL",
    name: "NCT of Delhi"
  }),
  new State({
    id: "OR",
    name: "Orissa"
  }),
  new State({
    id: "PC",
    name: "Pondicherry"
  }),
  new State({
    id: "PB",
    name: "Punjab"
  }),
  new State({
    id: "RJ",
    name: "Rajasthan"
  }),
  new State({
    id: "SK",
    name: "Sikkim"
  }),
  new State({
    id: "TN",
    name: "Tamil nadu"
  }),
  new State({
    id: "TL",
    name: "Telangana"
  }),
  new State({
    id: "TR",
    name: "Tripura"
  }),
  new State({
    id: "UP",
    name: "Uttar Pradesh"
  }),
  new State({
    id: "UC",
    name: "Uttrakhand"
  }),
  new State({
    id: "WB",
    name: ">West Bengal"
  })
];
var done = 0;
for (var i = 0; i < states.length; i++) {
  states[i].save(function(err, result) {
    done++;
    if (done === states.length) {
      mongoose.disconnect();
    }
  });
}
