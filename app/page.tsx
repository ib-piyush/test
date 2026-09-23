'use client';
import { useEffect, useRef, useState } from 'react';
import { useThrottle } from './hook/useThrottle';
import useDebounce from './hook/useDebounce';

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [query, setQuery] = useState('');
  const debounceQuery = useDebounce(query, 2000);

  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const limit = 100;

  const callData = async () => {
    if (!hasMore) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${debounceQuery}&limit=${limit}&skip=${(page - 1) * limit}`
      );

      const json = await res.json();
      let products = json.products;
      if (category) {
        products = products.filter((p: any) => p.category === category)
      }
      if (minPrice) {
        products = products.filter((p: any) => p.price > (parseFloat(minPrice) || 0))
      }
      if (maxPrice) {
        products = products.filter((p: any) => p.price < (parseFloat(maxPrice) || Infinity))
      }
      if (sort === 'price-asc') {
        products = products.sort((a: any, b: any) => a.price - b.price)
      }
      if (sort === 'price-desc') {
        products = products.sort((a: any, b: any) => b.price - a.price)
      }
      if (sort === 'rating') {
        products = products.sort((a: any, b: any) => b.rating - a.rating)
      }
      setData((prev) => (page === 1 ? products : [...prev, ...products]));

      if (products.length < limit) {
        setHasMore(false);
      }
      setLoading(false);
    } catch {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  const throttle = useThrottle(callData, 2000);
  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
  }, [debounceQuery, category, sort, minPrice, maxPrice]);

  // FETCH ONLY WHEN PAGE CHANGES
  useEffect(() => {
    callData();
  }, [page]);

  useEffect(() => {
    if (loading) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }
  }, [loading, data, hasMore]);

  return (
    <div style={{ padding: '20px', maxWidth: '90%', margin: 'auto' }}>

      {/* 🔥 FILTER BAR */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            flex: '1',
            minWidth: '150px'
          }}
        />
        <select
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="beauty">Beauty</option>
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
        </select>
        <input
          type='number'
          placeholder="Min Price"
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type='number'
          placeholder="Max Price"
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <select
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price Low → High</option>
          <option value="price-desc">Price High → Low</option>
          <option value="rating">Rating</option>
        </select>
        <button
          onClick={throttle}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            border: 'none',
            background: '#4f46e5',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          Search
        </button>
        < button
          onClick={() => {
            setQuery('');
            setCategory('');
            setMinPrice('');
            setMaxPrice('');
            setSort('');
          }}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            background: '#fff',
            color: '#333',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>

      {/* 🔥 DATA */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {data.length < 1 ? (
          <p>No data found</p>
        ) : (
          data.map((item, index) => (
            <div
              ref={index === data.length - 1 ? lastElementRef : null}
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: "12px",
                padding: "15px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                fontFamily: "sans-serif",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                background: "#fff",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.08)";
              }}
            >
              {/* Image */}
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              {/* Title */}
              <h3 style={{ margin: 0, fontSize: "16px" }}>{item.title}</h3>

              {/* Brand + Category */}
              <p style={{ margin: 0, fontSize: "12px", color: "#777" }}>
                {item.brand} • {item.category}
              </p>

              {/* Description */}
              <p style={{ margin: 0, fontSize: "13px", color: "#555" }}>
                {item.description.slice(0, 80)}...
              </p>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                  ${item.price}
                </span>
                <span style={{ fontSize: "12px", color: "green" }}>
                  {item.discountPercentage}% OFF
                </span>
              </div>

              {/* Rating */}
              <div style={{ fontSize: "13px", color: "#444" }}>
                ⭐ {item.rating} | Stock: {item.stock}
              </div>

              {/* Tags */}
              <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                {item.tags.map((tag: any, i: any) => (
                  <span
                    key={i}
                    style={{
                      background: "#f1f1f1",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      fontSize: "11px",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Shipping */}
              <p style={{ fontSize: "12px", color: "#888", margin: 0 }}>
                🚚 {item.shippingInformation}
              </p>

              {/* Button */}
              <button
                style={{
                  marginTop: "auto",
                  padding: "10px",
                  border: "none",
                  background: "#000",
                  color: "#fff",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}