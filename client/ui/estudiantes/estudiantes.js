import {Template} from "meteor/templating";
import Swal from "sweetalert2";
import "./estudiantes.html";
//import "../estudianteList/estudianteList.html";
import {ReactiveVar} from "meteor/reactive-var";


Template.estudiantes.helpers({
  listaEstudiantes: function () {
    var instance = Template.instance();
    console.log(instance);
    return instance.listaEstudiantes.get();
  },
  refreshList: function () {
    var instance = Template.instance();
    return instance.refreshList.get();
  },
  countEstudiantes: function () {
    var instance = Template.instance();
    return instance.countEstudiantes.get();
  },
});


function updateList(instance) {
  Meteor.call("listEstudiante", function (error, result) {
    var estudiantes = result.map(function (estudiante) {
      var sumCarnet = 0;
      estudiante.carnet.split("").forEach(function (c) {
        sumCarnet = sumCarnet + parseInt(c);
      });
      var info = {
        usuario: estudiante.usuario,
        carnet: estudiante.carnet,
        sumatoria: sumCarnet,
      };
      return info;
    });
    if (error) console.error(error);
    else {
      instance.listaEstudiantes.set(estudiantes);
      instance.countEstudiantes.set(result.length);
    }
  });
}

Template.estudiantes.onCreated(function () {
  var self = this;
  self.listaEstudiantes = new ReactiveVar([]);
  self.refreshList = new ReactiveVar(false);
  self.countEstudiantes = new ReactiveVar(0);

  updateList(self);
});

Template.estudiantes.events({
  "submit form"(event, instance) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var target = event.target;
    var vUsuario = target.usuario.value;
    var vCarnet = target.carnet.value;
    var data = {usuario: vUsuario, carnet: vCarnet};
    var vidEstudiante = "";
    Meteor.call("addEstudiante", data, function (err, response) {
      vidEstudiante = response;
      updateList(instance);

      if (err) {
        Swal.fire(`Se creo el estudiante con id:${err}`);
      } else {
        Swal.fire(`Se creo el estudiante con id:${vidEstudiante}`);
      }
    });
  },
});

Template.estudiantes.rendered = () => {
  $(".frmNuevoEstudiante").validate({
    rules: {
      carne: {
        required: true,
        maxlength: 6,
      },
      usuario: {
        required: true,
      },
    },
    messages: {
      carne: {
        required: "Ingrese numero de carne.",
        maxlength: "Ingrese numero de carne válido.",
      },
      usuario: {
        required: "Ingrese usuario.",
      },
    },
    highlight: function (element) {
      $(element).closest(".form-group").addClass("has-error");
    },
    unhighlight: function (element) {
      $(element).closest(".form-group").removeClass("has-error");
    },
  });
};
