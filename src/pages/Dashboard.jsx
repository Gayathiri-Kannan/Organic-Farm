import { useEffect, useState } from 'react';
import './dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [productList, setProductList] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });

  // Load user and data from localStorage
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
      const savedCart = JSON.parse(localStorage.getItem(`cart_${currentUser.id}`)) || [];
      const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
      setCart(savedCart);
      setProductList(savedProducts);
    }
  }, []);

  // Save products to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(productList));
  }, [productList]);

  // Save cart to localStorage whenever updated
  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    }
  }, [cart]);

  // Add product to cart
  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    alert(`${product.name} added to cart`);
  };

  // Remove product from cart
  const removeFromCart = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
  };

  // Add a new product from the form
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert("Please fill all product fields.");
      return;
    }

    const newItem = {
      id: Date.now(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      image: newProduct.image
    };

    setProductList([...productList, newItem]);
    setNewProduct({ name: '', price: '', image: '' });
  };

  // Logout and redirect
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };

  if (!user) {
    return <p className="text-center mt-5">Loading user data...</p>;
  }

  return (
    <div className="products-container">
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Welcome {user.name}!</h2>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Main Section */}
        <div className="row">
          {/* Left: Products */}
          <div className="col-md-8">
            <h4 className="mb-3">Available Products</h4>
            <div className="row">
              {productList.map(product => (
                <div key={product.id} className="col-md-3 mb-4">
                  <div className="card h-100 shadow-sm small-card">
                    <img src={product.image} className="card-img-top product-image" alt={product.name} />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">₹{product.price}</p>
                      <button className="btn btn-success mt-auto" onClick={() => addToCart(product)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {productList.length === 0 && <p>No products available. Add one above!</p>}
            </div>
          </div>

          {/* Right: Cart */}
          <div className="col-md-4">
            <h4 className="mb-3">Your Cart ({cart.length} items)</h4>
            {cart.length === 0 ? (
              <p>No items in the cart.</p>
            ) : (
              <>
                <ul className="list-group mb-3">
                  {cart.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        {item.name} - ₹{item.price}
                      </div>
                      <button
                        className="btn btn-outline-danger btn-sm ms-2"
                        onClick={() => removeFromCart(index)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="text-end">
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

export default Dashboard;
