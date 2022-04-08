import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from 'chai'

import { BASE_URL, fetchPosts } from "../../../src/services/jsonPlaceholder";

describe("fetchUsers", () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    describe("when API call is successful", () => {
        it("should return users list", async () => {
            // given
            const users = [
                { id: 1, name: "John" },
                { id: 2, name: "Andrew" },
            ];
            mock.onGet(`${BASE_URL}/posts`).reply(200, users);

            // when
            const result = await fetchPosts();
            expect(mock.history.get[0].url).to.eql(`${BASE_URL}/posts`);
            expect(result.data).to.eql(users);
        });
    });

    describe("when API call fails", () => {
        it("should return empty users list", async () => {
            // given
            mock.onGet(`${BASE_URL}/posts`).networkErrorOnce();

            // when
            const result = await fetchPosts();

            // then
            expect(mock.history.get[0].url).to.eql(`${BASE_URL}/posts`);
            expect(result).to.not.eql([]);
        });
    });
    describe("when API call fails", () => {
        it('should return empty users list', () => {
            return expect(fetchPosts()).to.be.fulfilled
                .then((returnedValue) => {
                    expect(returnedValue).to.not.be.equal([]);
                });
        });
    });
});