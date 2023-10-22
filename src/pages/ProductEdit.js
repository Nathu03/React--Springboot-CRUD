import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch the product data based on the productId from the URL parameter
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then(response => {
        const product = response.data;
        // Check if product data is valid before setting state
        if (product && product.name && product.price) {
          setName(product.name);
          setPrice(product.price);
        } else {
          console.error('Invalid product data:', product);
        }
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, [id]);

  
  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8080/api/products/${id}`, { name, price })
      .then((response) => {
        setSuccessMessage('Product updated successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 2000); // Hide success message after 2 seconds
  
        console.log('Product updated successfully:', response.data);
        // Redirect to the product list page after successful update
        navigate('/product-list', { state: { buttonClicked: true } });
      })
      .catch((error) => {
        setErrorMessage('Error updating product. Please try again.');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000); // Hide error message after 2 seconds
  
        console.error('Error updating product:', error);
      });
  };
  

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Edit Product</h1>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">Price:</label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">Update Product</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/product-list')}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ProductEdit;
