'use strict'

import { expect } from 'chai';
import request from 'supertest'
import app from '../src/app';

const inst = app.listen(4000);

describe('Test sample authorization header',  () => {
  it('should be "401"', async () => {
    const res = await request(inst)
    .get('/pets')
    .expect(401);
  })

  it('should be "200"', async () => {
    const res = await request(inst)
    .get('/pets/tobi')
    .set('Authorization', 'bearer 1234567890')
    .expect(200);
  })

})
