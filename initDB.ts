//acceso a las variables de entorno de .env
//require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();
import connection from './src/lib/connectMongoose';
import Company from './src/models/company';
import Applicant from './src/models/applicant';
import InternshipOffer from './src/models/internshipOffer';
import User from "./src/models/user";
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
  await initInternships();
  await initUsers();
  connection.close();
}


const initCompanies = async () => {
  const deleted = await Company.deleteMany();
  console.log(`¬¬¬ Se han eliminado ${deleted.deletedCount} empresas de la BD ${connection.name}.`)

  // crear empresas iniciales
  const initialCompanies = await Company.insertMany([
    { dniCif: "A000666",
      password: "123", 
      name: "Apple",
      mail: "apple@mail.es",
      phone: "000000000",
      sector: "Avaricia y Telecomunicaciones",
      ubication: "Hell",
      description: "Vendemos lo mismo que otros pero más chic y, por tanto, más caro",
      publishedOffers: []
    },
    { dniCif: "G000666",
      password: "123", 
      name: "Google",
      mail: "google@mail.es",
      phone: "000000000",
      sector: "Tecnológicas",
      ubication: "EEUU",
      description: "La tecnología a tu alcance a cambio de tus datos (y algo de tu alma)",
      publishedOffers: []
    },
  ])
  console.log(`··· Creados ${initialCompanies.length} empresas nuevas.`)
}

const initApplicants = async () => {
  const deleted = await Applicant.deleteMany();
  console.log(`¬¬¬ Se han eliminado ${deleted.deletedCount} aspirantes de la BD ${connection.name}.`)


  // crear aspirantes iniciales
  const initialApplicants = await Applicant.insertMany([
    { dniCif: "000000000A", 
      name: "Antonio", 
      password: "123", 
      mail: "antonio@mail.es",
      phone: "000000001",
      photo: "url-foto",
      cv: "url-cv",
      ubication: "Madrid",
      role: "presencial",
      typeJob: "renumerado",
      wantedJob: "lo que sea",
      geographically_mobile: false,
      disponibility: true,
      preferredOffers: [],
      suscribedOffers:[]
    },
    { dniCif: "000000001A", 
      name: "Ana", 
      password: "123", 
      mail: "ana@mail.es",
      phone: "000000001",
      photo: "url-foto",
      cv: "url-cv",
      ubication: "Madrid",
      role: "presencial",
      typeJob: "renumerado",
      wantedJob: "encender ordenadores",
      geographically_mobile: false,
      disponibility: true,
      preferredOffers: [],
      suscribedOffers:[]
    },
    
  ])
  console.log(`··· Creados ${initialApplicants.length} aspirantes nuevos.`)
}

const initInternships = async () => {
  const deleted = await InternshipOffer.deleteMany();
  console.log(`¬¬¬ Se han eliminado ${deleted.deletedCount} ofertas de la BD ${connection.name}.`)

  // crear aspirantes iniciales
  const initialInternship = await InternshipOffer.insertMany([
    { tittle: "Puesto becario para traer café", 
      publicationDate: "2024-06-01",
      description: "hacer cafeses, chocolates e infusiones",
      //company:,
      status: true,
      numberVacancies: 1,
      // listAspirings:,
      numberAspirings: 1
    },
    { tittle: "Puesto Chollazo", 
      publicationDate: "2024-06-01",
      description: "Proyecto interesante y gastos cubiertos",
      //company:,
      status: true,
      numberVacancies: 1,
      // listAspirings:,
      numberAspirings: 1
    },
    
    
  ])
  console.log(`··· Creados ${initialInternship.length} ofertas nuevas.`)
}

const initUsers = async () => {
  const deleted = await User.deleteMany();
  console.log(`¬¬¬ Se han eliminado ${deleted.deletedCount} datos de acceso de la BD ${connection.name}.`)

  // crear datos de acceso iniciales
  const initialUser = await User.insertMany([
    { dniCif: "A000666",
      password: "123", 
      enterprise: true,
      mail: "apple@mail.es",
    },
    { dniCif: "G000666",
      password: "123", 
      enterprise: true,
      mail: "google@mail.es",
    },
    { dniCif: "000000000A", 
      password: "123", 
      enterprise: false,
      mail: "antonio@mail.es",
    },
    { dniCif: "000000001A", 
      password: "123", 
      enterprise: false,
      mail: "ana@mail.es",
    }
  ]);

  console.log(`··· Creados ${initialUser.length} datos de acceso nuevos.`)
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