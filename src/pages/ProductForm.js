import React, { useState } from 'react';
import axios from 'axios';
import './ProductForm.css';

function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8080/api/products', { name, price })
      .then(response => {
        setSuccessMessage('Product created successfully!');
        console.log('Product created successfully:', response.data);
        setTimeout(() => {
          setSuccessMessage('');
        }, 2000); // Hide the success message after 2 seconds
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Create Product</h1>
      {successMessage && (
        <div className="alert alert-success fade-out" role="alert">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Name:</label>
          <input type="text" className="form-control" id="productName" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">Price:</label>
          <input type="number" className="form-control" id="productPrice" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary me-2">Create Product</button> 
          <a href="/product-list" className="btn btn-primary">Product List</a>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
