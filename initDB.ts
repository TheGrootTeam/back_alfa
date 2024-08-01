'use strict';

//import env variables
import dotenv from 'dotenv';
dotenv.config();

//connect to db
import connection from './src/lib/connectMongoose';
//import models
import models from './src/models/index';
const { Company, Offer, Applicant } = models;
//library to add a security question
import readLinea from 'node:readline';
//import json examples
import examples from './src/exampleDBjson/index';
const { exOffers, exCompanies, exApplicants } = examples;

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

  await initCompanies();
  await initApplicants();
  await initOffers();

  connection.close();
}

const initCompanies = async () => {
  // delete all companies data
  const deleted = await Company.deleteMany();
  console.log(`¬¬¬ Deleted ${deleted.deletedCount} companies from BD ${connection.name}.`);

  // create companies examples
  const initialCompanies = await Company.insertMany(exCompanies);
  console.log(`··· Created ${initialCompanies.length} new companies.`);
};

const initApplicants = async () => {
  //delete all applicants data
  const deleted = await Applicant.deleteMany();
  console.log(`¬¬¬ Deleted ${deleted.deletedCount} applicants form BD ${connection.name}.`);

  // create applicants examples
  const initialApplicants = await Applicant.insertMany(exApplicants);
  console.log(`··· Created ${initialApplicants.length} new applicants.`);
};


const initOffers = async () => {
  // delete all offers data
  const deleted = await Offer.deleteMany();
  console.log(`¬¬¬ Deleted ${deleted.deletedCount} offers form BD ${connection.name}.`);

  // crear offers examples
  const initialOffers = await Offer.insertMany(exOffers);
  console.log(`··· Created ${initialOffers.length} new offers.`);
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
