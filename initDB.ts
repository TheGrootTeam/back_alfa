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
// import the interfaces
import { IRolsModel } from './src/interfaces/IRols';
import { ISkillsModel } from './src/interfaces/ISkills';
import { ISectorsModel } from './src/interfaces/ISector';
import { ICompanyEx } from './src/interfaces/ICompany';
import { IOfferEx } from './src/interfaces/IOffer';
import { IApplicantEx } from './src/interfaces/IApplicant';

//import json examples
import exRols from './src/exampleDBjson/exRols.json';
import exSkills from './src/exampleDBjson/exSkills.json';
import exSectors from './src/exampleDBjson/exSectors.json';
import exApplicantsEx from './src/exampleDBjson/exApplicants.json';
import exCompaniesEx from './src/exampleDBjson/exCompanies.json';
import exOffersEx from './src/exampleDBjson/exOffers.json';

const exCompanies: ICompanyEx[] = exCompaniesEx;
const exApplicants: IApplicantEx[] = exApplicantsEx;
const exOffers: IOfferEx[] = exOffersEx;

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
  const mappedCompanies = exCompanies.map((company) => ({
    ...company,
    sector: sectors[randomNum(sectors.length)]._id
  }));
  const initialCompanies = await Company.insertMany(mappedCompanies);
  console.log(`··· Created ${initialCompanies.length} new companies.`);
};

const initApplicants = async (rols: IRolsModel[], skills: ISkillsModel[]) => {
  //delete all applicants data
  const deleted = await Applicant.deleteMany();
  console.log(`¬¬¬ Deleted ${deleted.deletedCount} applicants from BD ${connection.name}.`);

  // create applicants examples
  const mappedApplicants = exApplicants.map((applicant) => ({
    ...applicant,
    wantedRol: [rols[randomNum(rols.length)]._id, rols[randomNum(rols.length)]._id],
    mainSkills: [skills[randomNum(skills.length)]._id, skills[randomNum(skills.length)]._id]
  }));
  const initialApplicants = await Applicant.insertMany(mappedApplicants);
  console.log(`··· Created ${initialApplicants.length} new applicants.`);
};

const initOffers = async () => {
  // delete all offers data
  const deleted = await Offer.deleteMany();
  console.log(`¬¬¬ Deleted ${deleted.deletedCount} offers from BD ${connection.name}.`);

  // crear offers examples
  const companies = await Company.find();
  const offersMapped = exOffers.map((offer) => ({
    ...offer,
    companyOwner: companies[randomNum(companies.length)]._id
  }));
  const initialOffers = await Offer.insertMany(offersMapped);
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

function randomNum(num: number): number {
  return Math.floor(Math.random() * num);
}
