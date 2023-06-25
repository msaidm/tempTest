const request = require('supertest');
const { expect } = require('chai');

describe('API Routes', () => {
  let authToken;

  // Test the CREATE USER route
  it('should create a new user', async () => {
    const response = await request('http://localhost:3000')
      .post('api/v1/users')
      .send({ name: 'mar', email: 'mar@gmail.com', password: '123' });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'User registered with success');
    expect(response.body).to.have.property('token');
	
  });
  // Test the AUTHENTICATE USER route
  it('should authenticate a user and return a token', async () => {
    const response = await request('http://localhost:3000')
      .post('api/v1auth')
      .send({ email: 'mar@gmail.com', password: '123' });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
    authToken = response.body.token; 
  });
  
  // Test the GET USER route with authentication
  it('should get a user with authentication', async () => {
    const response = await request('http://localhost:3000')
      .get('api/v1/users')
      .set('Authorization', authToken );

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('name', 'mar');
    expect(response.body).to.have.property('email', 'mar@gmail.com');
    expect(response.body).to.have.property('password', '123');
    expect(response.body).to.have.property('imageUrl', 'https:/almsaeedstudio.com/themesadminLTE/dist/img/user2-160x160.jpg');
  });
  
    // Test the PATCH USER route with authentication
  it('should update a user with authentication', async () => {
    const response = await request('http://localhost:3000')
      .patch('api/v1/users')
      .set('Authorization', authToken)
      .send({ name: 'newName', email: 'new_email@gmail.com', password: 'newpassword123' });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'User updated with success!');
  });

  // Test the DELETE USER route with authentication
  it('should delete a user with authentication', async () => {
    const response = await request('http://localhost:3000')
      .delete('api/v1/users')
      .set('Authorization', authToken);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'User deleted with success');
  });
  
  // Test the DELETE ALL USERS route
  it('should delete all users', async () => {
    const response = await request('http://localhost:3000')
      .delete('api/v1all-users')
      .send({ key_admin: 'keyadmin123' });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'Users deleted with success');
  });
  
});