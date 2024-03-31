const request = require("supertest");
const { app, server } = require("../index");


describe("GET /cafes", () => {
    it("Should respond with a 200 status", async () => {
        const response = await request(server).get("/cafes").send();
        expect(response.status).toBe(200);
    });

    it('Should respond with an array of coffee', async () => {
        const response = await request(server).get('/cafes');
        expect(response.body).toBeInstanceOf(Array);
    })
});


describe('POST /cafes', () => {
    describe('A non-existent ID is needed', () => {
        const newCoffee = {
        id: "5"
    }

    it('should respond with a 201 status', async () => {
        const response = await request(server).post('/cafes').send(newCoffee)
        expect(response.status).toBe(201)
    })
    })
})


describe('PUT /cafes/:id', () => {
    describe('Given a valid coffee ID', () => {
        const addCoffee = {
            id: '1',
            nombre: 'Cortado'
        }

        it('Should respond with a 200 status', async () => {
            const updatedCoffee = { id: '1', nombre: 'Latte' }

            const responsePut = await request(server)
                .put(`/cafes/${addCoffee.id}`)
                .send(updatedCoffee)
            expect(responsePut.status).toBe(200)
            expect(responsePut.body[0]).toEqual(updatedCoffee)
        })
    })
})


describe('DELETE /cafe/:id', () => {
    describe('Given a valid coffee id', () => {
        const deleteCoffee = {
            id: '1',
            nombre: 'Cortado'
        }

       it('should respond with a 204 status', async () => {
    const response = await request(server).post('/cafes').send(deleteCoffee)
    const { id } = response.body
    const responseDelete = await request(server)
        .delete(`/cafes/${id}`)
        .set('Authorization', 'Bearer yourAuthTokenHere')
    expect(responseDelete.status).toBe(204)
})

        describe('given an invalid coffee id', () => {
            it('should respond with a 404 status', async () => {
                const { status } = await request(server)
                .delete('/cafes/-invalid-id')
                .send()
                expect(status).toBe(404)
            })
        })
    })
})



afterAll((done) => {
    server.close(done);
});