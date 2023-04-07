const { setupBefore, setupChai, removeTestDB, runSQLQuery } = require('./utils/test-utils');
const chai = setupChai();
const expect = chai.expect;
const spies = require('chai-spies')
chai.use(spies);

describe('Insert Specs', () => {
    let DB_TEST_FILE, SERVER_DB_TEST_FILE, models, server;
    before(async () => ({ server, models, DB_TEST_FILE, SERVER_DB_TEST_FILE } = await setupBefore(__filename)));
    after(async () => await removeTestDB(DB_TEST_FILE));

    describe('Build a Puppy', () => {

        it('implements the correct build for Trudy', async () => {
            const reqBody = {
                name: 'Trudy',
                age_yrs: 2,
                breed: 'Brittany Spaniel',
                weight_lbs: 38,
                microchipped: false
            }
            buildSpy = chai.spy.on(models.Puppy, 'build')
            createSpy = chai.spy.on(models.Puppy, 'create')
            await chai.request(server)
            .post(`/puppies/build`)
            .send(reqBody)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                expect(res.body.data.name).to.eq("Trudy");
                expect(res.body.data.age_yrs).to.eq(2);
                expect(res.body.data.breed).to.eq("Brittany Spaniel");
                expect(res.body.data.weight_lbs).to.eq(38);
                expect(res.body.data.microchipped).to.eq(false);
            });
            expect(buildSpy).to.have.been.called();
            expect(createSpy).to.not.have.been.called();
            const trudy = await models.Puppy.findOne({ where: { name: 'Trudy' } });
            expect(trudy.name).to.eq('Trudy');
            expect(trudy.age_yrs).to.eq(2);
            expect(trudy.breed).to.eq("Brittany Spaniel");
            expect(trudy.weight_lbs).to.eq(38);
            expect(trudy.microchipped).to.eq(false);
        });
    });

    describe('Create a Puppy', () => {

        it('implements the correct create for Beans', async () => {
            const reqBody = {
                name: 'Beans',
                age_yrs: 1.6,
                breed: 'Bulldog',
                weight_lbs: 42,
                microchipped: true
            }
            await chai.request(server)
            .post(`/puppies/create`)
            .send(reqBody)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                expect(res.body.data.name).to.eq("Beans");
                expect(res.body.data.age_yrs).to.eq(1.6);
                expect(res.body.data.breed).to.eq("Bulldog");
                expect(res.body.data.weight_lbs).to.eq(42);
                expect(res.body.data.microchipped).to.eq(true);
            })
            expect(createSpy).to.have.been.called()
            const test = await models.Puppy.findOne({ where: { name: 'Beans' } });
            expect(test.name).to.eq('Beans');
            expect(test.age_yrs).to.eq(1.6);
            expect(test.breed).to.eq("Bulldog");
            expect(test.weight_lbs).to.eq(42);
            expect(test.microchipped).to.eq(true);
        });
    });
});
