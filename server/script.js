

const build = async () => {
//   const { Puppy } = require('./db/models');
  try {
//     // build a new puppy instance
//     const newPuppy = Puppy.build({
//       name: "Trudy",
//       ageYrs: 2,
//       weightLbs: 38,
//       breed: "Brittany Spaniel",
//       microchipped: false,
//     })

//     // save instance to database
//     await newPuppy.save();

//     console.log('Trudy has been added to the database.');
  } catch (err) {
//     console.error("Error adding Trudy:", err);
  }

};

const create = async () => {
  const { Puppy } = require('./db/models');
  try {
    // create new puppy instance
    const newPuppy = await Puppy.create({
      name: "Beans",
      ageYrs: 1.6,
      weightLbs: 42,
      breed: "Bulldog",
      microchipped: true,
    })

    console.log("Beans has been added to the database.");
  } catch (err) {
    console.error("Error adding Beans:", err);
  }
};

if (require.main === module) {
  require('dotenv').config();
  const { resetDB, seedAllDB } = require('./test/utils/test-utils');
  (async () => {
    await resetDB("db/dev.db");
    await seedAllDB("db/dev.db");
    try {
      await build();
    } catch(err) {
      console.error('There was an error thrown while building:');
      console.error(err);
    }
    try {
      await create();
    } catch(err) {
      console.error('There was an error thrown while creating:');
      console.error(err);
    }
  })();
} else {
  module.exports = { build, create };
}
