import {Meteor} from "meteor/meteor";
import './methods'
import Estudiantes from "../lib/collections/collections"; // or, as it's on github, for simplicity, import {Posts} from '/db';

Meteor.startup(() => {
  console.log("Mongo", "Antes de insert en estudiante");

  Estudiantes.remove({}) 
});
