import {Meteor} from "meteor/meteor";
import Estudiantes from "../lib/collections/collections"; // or, as it's on github, for simplicity, import {Posts} from '/db';
Meteor.methods({
  addEstudiante: function (estudiante) {
    try {
      var estudianteID = Estudiantes.insert(estudiante);
      return estudianteID;
    } catch (exception) {
      throw new Meteor.Error("500", exception);
    }
  },
  listEstudiante: function () {
    return Estudiantes.find().fetch();
  },
  getCurrentTime: function () {
    console.log("on server, getCurrentTime called");
    return new Date();
  },
});
