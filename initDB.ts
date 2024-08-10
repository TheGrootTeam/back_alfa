'use strict';

//import env variables
import dotenv from 'dotenv';
dotenv.config();

//connect to db
import connection from './src/lib/connectMongoose';
//import models
import models from './src/models/index';
const { Company, Offer, Applicant, Rol, Skill, Sector } = models;
//library to add a security question
import readLinea from 'node:readline';
//import json examples
import examples from './src/exampleDBjson/index';
const { exRols, exSkills, exSectors } = examples;
// import the interfaces
import { IRolsModel } from './src/interfaces/IRols';
import { ISkillsModel } from './src/interfaces/ISkills';
import { ISectorsModel } from './src/interfaces/ISector';

main().catch((err) => console.log('Error in initDB: ', err));

async function main() {
  //to wait until we are connected to db
  await new Promise((resolve) => connection.once('open', resolve));

  //ask question to add security on delete all db
  const deletedb = await fConfirmation(
    `WARNING! You are going to delete all content\nThis action cannot be undone\nAre you sure you want to delete all database content?\nPress ENTER to cancel or YES to confirm: `
  );

  if (!deletedb) {
    console.log('Canceled');
    process.exit();
  }

  await initRols();
  await initSectors();
  await initSkills();

  const rols: IRolsModel[] = await Rol.find();
  const sectors: ISectorsModel[] = await Sector.find();
  const skills: ISkillsModel[] = await Skill.find();

  await initApplicants(rols, skills);
  await initCompanies(sectors);
  await initOffers();

  connection.close();
}

const initCompanies = async (sectors: ISectorsModel[]) => {
  // delete all companies data
  const deleted = await Company.deleteMany();
  console.log(`¬¬¬ Deleted ${deleted.deletedCount} companies from BD ${connection.name}.`);

  // create companies examples
  const initialCompanies = await Company.insertMany([
    {
      dniCif: 'A000666',
      password: '$2b$10$/htHbtmdDR8jYpS7BRgqhOKla.dL.EsWpX0fAdrBHec7.HvR0/gU.',
      name: 'Apple',
      email: 'apple@mail.es',
      phone: '000000000',
      sector: sectors[7]._id,
      ubication: 'Hell',
      description: 'Vendemos lo mismo que otros pero más chic y, por tanto, más caro',
      logo: '/public/companies/logos/appleLogo.jpg',
      publishedOffers: []
    },
    {
      dniCif: 'G000666',
      password: '$2b$10$HkO24CBElxPCtTf7Qa1TTuaMGdKcoShFwtLdSbdloxtdUw1jJ51Aa',
      name: 'Google',
      email: 'google@mail.es',
      phone: '000000000',
      sector: sectors[11]._id,
      ubication: 'EEUU',
      description: 'La tecnología a tu alcance a cambio de tus datos (y algo de tu alma)',
      logo: '/public/companies/logos/googleLogo.jpg',
      publishedOffers: []
    }
  ]);
  console.log(`··· Created ${initialCompanies.length} new companies.`);
};

const initApplicants = async (rols: IRolsModel[], skills: ISkillsModel[]) => {
  //delete all applicants data
  const deleted = await Applicant.deleteMany();
  console.log(`¬¬¬ Deleted ${deleted.deletedCount} applicants from BD ${connection.name}.`);

  // create applicants examples
  const initialApplicants = await Applicant.insertMany([
    {
      dniCif: '000000000A',
      password: '$2b$10$SZSiYJA20l32Iwd3A7LfiO.5iIbq6fK9i/p4ybuZ94hVC/l80P9Ba',
      name: 'Antonio',
      lastName: 'Flores',
      email: 'antonio@mail.es',
      phone: '000000001',
      photo: 'url-foto',
      cv: 'url-cv',
      ubication: 'Madrid',
      typeJob: 'presencial',
      internType: 'renumerado',
      wantedRol: [rols[5]._id, rols[11]._id],
      mainSkills: [skills[34]._id, skills[23]._id],
      geographically_mobile: false,
      disponibility: true,
      preferredOffers: [],
      suscribedOffers: []
    },
    {
      dniCif: '000000001A',
      password: '$2b$10$5Z4tn8Mjt5g7v76ABanskON9.W2qVU1nNCfXmS9v13bsEBpqTyJxW',
      name: 'Ana',
      lastName: 'Fernandez',
      email: 'ana@mail.es',
      phone: '000000001',
      photo: 'url-foto',
      cv: 'url-cv',
      ubication: 'Madrid',
      typeJob: 'presencial',
      internType: 'renumerado',
      wantedRol: [rols[4]._id, rols[17]._id],
      mainSkills: [skills[44]._id, skills[21]._id],
      geographically_mobile: false,
      disponibility: true,
      preferredOffers: [],
      suscribedOffers: []
    }
  ]);
  console.log(`··· Created ${initialApplicants.length} new applicants.`);
};

const initOffers = async () => {
  // delete all offers data
  const deleted = await Offer.deleteMany();
  console.log(`¬¬¬ Deleted ${deleted.deletedCount} offers from BD ${connection.name}.`);

  // crear offers examples
  const companies = await Company.find();
  const initialOffers = await Offer.insertMany([
    {
      position: 'Puesto becario para traer café',
      publicationDate: '2024-06-01',
      description: 'hacer cafeses, chocolates e infusiones',
      companyOwner: companies[0]._id,
      status: true,
      numberVacancies: 1,
      listApplicants: [],
      numberApplicants: 1
    },
    {
      position: 'Puesto Chollazo',
      publicationDate: '2024-06-01',
      description: 'Proyecto interesante y gastos cubiertos',
      companyOwner: companies[1]._id,
      status: true,
      numberVacancies: 1,
      listApplicants: [],
      numberApplicants: 1
    },
    {
      position: 'Becario para startup',
      publicationDate: '2024-08-03',
      description: 'Aprende con nosotros',
      companyOwner: companies[0]._id,
      status: true,
      numberVacancies: 3,
      listApplicants: [],
      numberApplicants: 0
    },
    {
      position: 'Puesto aprendiz frontend con React',
      publicationDate: '2024-08-01',
      description: 'Formate como futuro expreto de React',
      companyOwner: companies[1]._id,
      status: true,
      numberVacancies: 4,
      listApplicants: [],
      numberApplicants: 3
    },
    {
      position: 'Becario para backend',
      publicationDate: '2024-07-23',
      description: 'Domina el manejo de las APIs con nosotros en un ambiente familiar.',
      companyOwner: companies[0]._id,
      status: true,
      numberVacancies: 2,
      listApplicants: [],
      numberApplicants: 0
    },
    {
      position: 'Puesto de vespa',
      publicationDate: '2024-05-09',
      description: 'Ves-pa aquí, ves-pa allá!!',
      companyOwner: companies[1]._id,
      status: true,
      numberVacancies: 2,
      listApplicants: [],
      numberApplicants: 3
    }
  ]);
  console.log(`··· Created ${initialOffers.length} new offers.`);
};

const initRols = async () => {
  // delete all rols data
  const deleted = await Rol.deleteMany();
  console.log(`¬¬¬ Deleted ${deleted.deletedCount} rols from BD ${connection.name}.`);

  // create rols examples
  const initialRols = await Rol.insertMany(exRols);
  console.log(`··· Created ${initialRols.length} new rols.`);
};

const initSkills = async () => {
  // delete all skills data
  const deleted = await Skill.deleteMany();
  console.log(`¬¬¬ Deleted ${deleted.deletedCount} skills from BD ${connection.name}.`);

  // create skills examples
  const initialSkills = await Skill.insertMany(exSkills);
  console.log(`··· Created ${initialSkills.length} new skills.`);
};

const initSectors = async () => {
  // delete all sectors data
  const deleted = await Sector.deleteMany();
  console.log(`¬¬¬ Deleted ${deleted.deletedCount} sectors from BD ${connection.name}.`);

  // create sectors examples
  const initialSectors = await Sector.insertMany(exSectors);
  console.log(`··· Created ${initialSectors.length} new sectors.`);
};

function fConfirmation(text: string) {
  return new Promise((resolve, _reject) => {
    // connect readlinne
    const ifc = readLinea.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    ifc.question(text, (response: string) => {
      ifc.close();
      resolve(response.toLowerCase() === 'yes');
    });
  });
}
