import dotenv from 'dotenv';
dotenv.config();
import connection from './src/lib/connectMongoose';

main().catch(err => console.log('Se ha producido un error: ', err));


async function main() {

  //Creo una promesa para esperar  a la realización de la conexión
  await new Promise((resolve) => connection.once('open', resolve));

  await verCollections();
  await verEmpresas();
  connection.close();
}


const verCollections = async () => {

  const db = connection.db;
  const listaCollections = await db.listCollections().toArray();

  console.log("-Colecciones de la BD: ")
  listaCollections.forEach((coleccion) => console.log(coleccion.name));

}

const verEmpresas = async () => {
  const db = connection.db;
  const empresasCollection = db.collection('empresas');
  const empresas = await empresasCollection.find({}).toArray();
  console.log("- Empresas dela BD:");
  empresas.forEach(empresa => {console.log(`${empresa.nombre_empresa} / ${empresa.mail_empresa}`)});
  
  //listaEmpresas.forEach( empresa => { console.log(empresa);
}

  


