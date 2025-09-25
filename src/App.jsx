
import { useState, useEffect } from 'react';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import SearchBar from './SearchBar';
import Cart from './Cart';
import './App.css';
import './ProductCard.css';
import './ProductList.css';
import './ProductDetails.css';
import './SearchBar.css';
import './Cart.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/products/search?q=phone')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setFiltered(data.products);
        setSuggestions(data.products.map(p => p.title));
        setCategories([...new Set(data.products.map(p => p.category))]);
        const prices = data.products.map(p => p.price);
        setPriceRange([Math.min(...prices), Math.max(...prices)]);
      });
  }, []);

  useEffect(() => {
    let result = products.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (category ? p.category === category : true) &&
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    if (sort === 'price-asc') result = result.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result = result.sort((a, b) => b.price - a.price);
    if (sort === 'rating') result = result.sort((a, b) => b.rating - a.rating);
    setFiltered([...result]);
    setSuggestions(
      products
        .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
        .map(p => p.title)
    );
  }, [search, category, sort, priceRange, products]);

  const handleAddToCart = (product) => {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setShowCheckout(true);
    setTimeout(() => {
      setCart([]);
      setShowCheckout(false);
      alert('Thank you for your purchase!');
    }, 1200);
  };

  return (
    <div className="shop-container">
      <header className="shop-header">
        <h1>E-Commerce Shop</h1>
        <div className="shop-filters">
          <SearchBar
            suggestions={suggestions.slice(0, 8)}
            onSearch={setSearch}
          />
          <select value={category} onChange={e => setCategory(e.target.value)} className="filter-select">
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)} className="filter-select">
            <option value="">Sort</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
          <div className="price-range">
            <label>Price:</label>
            <input
              type="number"
              min={priceRange[0]}
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
              className="price-input"
            />
            <span> - </span>
            <input
              type="number"
              min={priceRange[0]}
              max={priceRange[1]}
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], +e.target.value])}
              className="price-input"
            />
          </div>
        </div>
      </header>
      <main className="shop-main">
        <div className="shop-products">
          <ProductList products={filtered} onProductClick={setSelected} />
        </div>
        <aside className="shop-cart">
          <Cart cart={cart} onCheckout={handleCheckout} onRemove={handleRemoveFromCart} />
        </aside>
      </main>
      {selected && (
        <ProductDetails
          product={selected}
          onClose={() => setSelected(null)}
          onAddToCart={handleAddToCart}
        />
      )}
      {showCheckout && (
        <div className="checkout-modal">
          <div className="checkout-content">
            <h2>Processing your order...</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
