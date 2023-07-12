var express = require('express');
var router = express.Router();
const { conexion } = require('../database/conexion.js')

/* Seleccionar pacientes*/
router.get('/', function (req, res) {
  conexion.query('SELECT * FROM pacientes', function (error, results) {
    if (error) {
      console.log("Error en la consulta", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.render('paciente', {paciente: results, opcion: 'disabled', estado: true});
    }
  });
});


// Agregar paciente

router.get('/agregar-paciente', (req, res) => {
  res.sendFile('registro-pacientes.html', { root: 'public' });
})

router.post('/agregar', (req, res) => {
  const cedula = req.body.cedula;
  const nombre = req.body.nombre;
  const apellido =req.body.apellido
   const edad = req.body.edad;
  const telefono = req.body.telefono;
  conexion.query(`INSERT INTO pacientes (cedula, nombre, apellido, edad, telefono) VALUES (${cedula},'${nombre}','${apellido}', ${edad}, '${telefono}')`, (error, result) => {
    if (error) {
      console.log("Ocurrio un error en la ejecución", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.redirect('/paciente');
    }
  });
})

// Actualizar mascotas

router.get('/activar', function (req, res) {
  conexion.query('SELECT * FROM pacientes', function (error, results) {
    if (error) {
      console.log("Error en la consulta", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.render('paciente', { paciente: results, opcion: ''});
    }
  });
});

router.post('/actualizar/:cedula', (req, res) => {
  const cedula = req.params.cedula;
  const nombre = req.body.paciente;
  const edad = req.body.edad;
  const telefono = req.body.telefono;
  conexion.query(`UPDATE pacientes SET nombre='${nombre}', edad=${edad}, telefono=${telefono} WHERE cedula=${cedula}`, (error, result) => {
    if (error) {
      console.log("Ocurrio un error en la ejecución", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.redirect('/paciente');
    }
  });
})

// Eliminar paciente

router.get('/eliminar/:cedula', (req, res) => {
  const cedula = req.params.cedula;
  conexion.query(`DELETE FROM pacientes WHERE cedula=${cedula}`, (error, result) => {
    if (error) {
      console.log("Ocurrio un error en la ejecución", error)
      res.status(500).send("Error en la consulta");
    } else {
      res.redirect('/paciente');
    }
  });
})


module.exports = router;