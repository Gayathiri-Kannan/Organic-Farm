import { useEffect, useState, useRef } from 'react';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });
  const fileInputRef = useRef(null);

  const defaultImage = 'https://via.placeholder.com/150?text=No+Image';

  // Load products from localStorage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  // Save products to localStorage
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    const { name, price, image } = newProduct;

    if (!name || !price) {
      alert('Please fill in the product name and price.');
      return;
    }

    const newItem = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      image: image || defaultImage,
    };

    setProducts(prev => [...prev, newItem]);
    setNewProduct({ name: '', price: '', image: '' });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
    alert(`${product.name} added to cart`);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const deleteProduct = (id) => {
    const updated = products.filter(product => product.id !== id);
    setProducts(updated);
  };

  return (
    <div className="products-container">
      <div className="container mt-5">

        {/* Add Product Form */}
        <div className="mb-5">
          <h4>Add New Product</h4>
          <div className="row g-2 mb-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </div>
            <div className="col-md-5">
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleImageUpload}
                ref={fileInputRef}
              />
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary w-100" onClick={handleAddProduct}>Add</button>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Product List */}
          <div className="col-md-8">
            <h2 className="mb-4">Buy Fresh Organic Products</h2>
            <div className="row">
              {products.map(product => (
                <div key={product.id} className="col-md-3 mb-4">
                  <div className="card h-100 shadow-sm small-card">
                    <img
                      src={product.image || defaultImage}
                      className="card-img-top product-image"
                      alt={product.name}
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h6 className="card-title">{product.name}</h6>
                      <p className="card-text">₹{product.price}</p>
                      <div className="d-grid gap-1 mt-auto">
                        <button className="btn btn-success" onClick={() => addToCart(product)}>Add to Cart</button>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(product.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {products.length === 0 && <p>No products available. Add some above!</p>}
            </div>
          </div>

          {/* Cart Section */}
          <div className="col-md-4">
            <h4>Your Cart ({cart.length} items)</h4>
            {cart.length === 0 ? (
              <p>No items in the cart.</p>
            ) : (
              <>
                <ul className="list-group">
                  {cart.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>{item.name} - ₹{item.price}</span>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(index)}>Remove</button>
                    </li>
                  ))}
                </ul>
                <div className="text-end mt-3">
                  <strong>Total: ₹{cart.reduce((sum, item) => sum + item.price, 0)}</strong>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
