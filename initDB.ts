//acceso a las variables de entorno de .env
//require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();
import connection from './src/lib/connectMongoose';
import Company from './src/models/company';
import Applicant from './src/models/applicant';
import InternshipPosition from './src/models/internshipPosition';
const readLinea = require('node:readline');  //¿Intercambiable?

main().catch(err => console.log('Se ha producido un error: ', err));


async function main() {

  //Creo una promesa para esperar  a la realización de la conexión
  await new Promise((resolve) => connection.once('open', resolve));

  // Avisamos del borrado inicial antes ejecutar la inicialización:
  console.log("\n ================================= ");
  console.log(" ==== Inicialización de la BD ==== ");
  console.log(" ================================= \n");
  console.log(" >>> Atención: Se fomateará la BD y se introducirán los datos iniciales mínimos.");
  const borrar = await fConfirmation(" >>> El contenido anterior de la BDs será borrado. Introduce 's' si deseas continuar... ");
  if (!borrar){
      console.log ("Inicialización abortada");
      process.exit();
  }

  await initCompanies();
  await initApplicants();
  await initInternship();
  connection.close();
}


const initCompanies = async () => {
  const deleted = await Company.deleteMany();
  console.log(`¬¬¬ Se han eliminado ${deleted.deletedCount} empresas de la BD ${connection.name}.`)

  console.log("BALIZA 1")
  
  // crear empresas iniciales
  const initialCompanies = await Company.insertMany([
    { cif: "666", name: "Appol"},
    { cif: "555", name: "Guguel"},
  ])
  console.log(`··· Creados ${initialCompanies.length} empresas nuevas.`)
}

const initApplicants = async () => {
  const deleted = await Applicant.deleteMany();
  console.log(`¬¬¬ Se han eliminado ${deleted.deletedCount} aspirantes de la BD ${connection.name}.`)

  console.log("BALIZA 2")

  // crear aspirantes iniciales
  const initialApplicants = await Applicant.insertMany([
    { dni: "000000000A", name: "Antonio" },
    { dni: "111111111B", name: "Anais" },
    { dni: "101010101C", name: "Aitor" },
  ])
  console.log(`··· Creados ${initialApplicants.length} aspirantes nuevos.`)
}

const initInternship = async () => {
  const deleted = await InternshipPosition.deleteMany();
  console.log(`¬¬¬ Se han eliminado ${deleted.deletedCount} ofertas de la BD ${connection.name}.`)

  console.log("BALIZA 3")

  // crear aspirantes iniciales
  const initialInternship = await InternshipPosition.insertMany([
    { tittle: "Puesto becario para traer café", publicationDate: "2024-06-01"},
    { tittle: "Puesto cholalzo. Proyecto interesante y gastos cubiertos", publicationDate: "2024-06-10"},
    { tittle: "Oferta en estudio. Vienes de prueba 2 días y luego ya, si eso, miramos si seguimos", publicationDate: "2024-06-11"},
    
  ])
  console.log(`¬¬¬ Creados ${initialInternship.length} ofertas nuevas.`)
}

  
function fConfirmation(texto: string) {
  return new Promise((resolve, reject) => {
    // conectamos la consola con el módulo readline 
    const ifc = readLinea.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    ifc.question(texto, (respuesta: string) => {
      ifc.close();
      resolve(respuesta.toLowerCase() === 's');
    })
  });
}