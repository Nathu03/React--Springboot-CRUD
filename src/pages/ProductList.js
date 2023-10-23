import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './ProductList.css'

function ProductList() {
  const location = useLocation();
  const [buttonClicked, setButtonClicked] = useState(location.state?.buttonClicked || false);

  useEffect(() => {
    // If buttonClicked is initially true, set it to false after 2 seconds
    if (buttonClicked) {
      const timer = setTimeout(() => {
        setButtonClicked(false);
      }, 2000);

      // Clear the timer when the component unmounts to prevent memory leaks
      return () => clearTimeout(timer);
    }
    // Dependency array is empty, so this effect will run once after the initial render
  }, [buttonClicked]);

  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Clear success message after 2 seconds
    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 2000);

    // Clear the timer if the component unmounts or successMessage changes
    return () => clearTimeout(timer);
  }, [successMessage]);

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
    const userResponse = window.prompt('Type "yes" if you want to delete this product.');
  
    if (userResponse && userResponse.toLowerCase() === 'yes') {
      axios.delete(`http://localhost:8080/api/products/${id}`)
        .then(() => {
          console.log('Product deleted successfully!');
          setSuccessMessage('Product deleted successfully!');
          fetchProducts(); // Refresh product list after deletion
          setTimeout(() => {
            setSuccessMessage('');
          }, 2000); // Hide success message after 2 seconds
        })
        .catch(error => {
          console.error('Error deleting product:', error);
          alert('Error deleting product: ' + error.message);
        });
    } else {
      console.log('Deletion canceled.');
    }
  };
  
  

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Product List</h1>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      {buttonClicked && <div className="alert alert-success">Product updated Successfully!</div>}
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
