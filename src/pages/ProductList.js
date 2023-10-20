import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:8080/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/products/${id}`)
      .then(() => {
        console.log('Product deleted successfully!');
        fetchProducts(); // Refresh product list after deletion
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Product List</h1>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
          Name
          <span className='fw-bold'>Price</span>
          <span className='fw-bold'>Action</span>
        </li>
        {products.map(product => (
          <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
            {product.name}
            <span className="badge bg-primary rounded-pill">${product.price}</span>
            <div className="btn-group">
              <Link to={`/product-edit/${product.id}`} className="btn btn-warning">Edit</Link>
              <button onClick={() => handleDelete(product.id)} className="btn btn-danger">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <Link to="/" className="btn btn-primary my-3">Create Product</Link>
    </div>
  );
}

export default ProductList;
