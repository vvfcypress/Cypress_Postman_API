///<reference types="cypress"/>

import { faker } from '@faker-js/faker';
import post from '../fixtures/post.json';
import user from '../fixtures/user.json';

user.email = faker.internet.email({ provider: 'ukr.com' });
post.id = faker.number.int({ min: 120, max: 500 });

let token;
let postId;

describe('API CRUD tests', () => {

  it('Register User', () => {

    cy.request({
      method: 'POST',
      url: '/register',
      body: user
    }).then(response => {
      expect(response.status).to.eq(201);
    })
  })

  it('Login User', () => {

    cy.request({
      method: 'POST',
      url: '/login',
      body: user
    }).then(response => {
      expect(response.status).to.eq(200);
      token = response.body.accessToken;
    })
  })

  it('CreateId-->ReadId-->UpdateId-->DeleteId', () => {

    cy.request({
      method: 'POST',
      url: '/664/posts',
      body: post,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      expect(response.status).to.eq(201);
      postId = response.body.id;
    }).then(() => {

      cy.request({
        method: 'GET',
        url: `/posts/${postId}`
      }).then(response => {
        expect(response.status).to.eq(200);
      })
    }).then(() => {

      post.body = faker.lorem.text();

      cy.request({
        method: 'PUT',
        url: `/664/posts/${postId}`,
        body: post,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.body).to.eq(post.body);
      })
    }).then(() => {

      cy.request({
        method: 'DELETE',
        url: `/posts/${postId}`
      }).then(response => {
        expect(response.status).to.eq(200);
      })
    })
      .then(() => {

        cy.request({
          method: 'GET',
          url: `/posts/${postId}`,
          failOnStatusCode: false
        }).then(response => {
          expect(response.status).to.eq(404);
        })
      })
  })
})


