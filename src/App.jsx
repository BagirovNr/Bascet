import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const App = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await fetch('http://localhost:3000/favorites');
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const addToFavorites = async (id) => {
    try {
      const selectedProduct = products.find((product) => product.id === id);
      const isAlreadyInFavorites = favorites.some((favorite) => favorite.id === id);

      if (isAlreadyInFavorites) {
        await fetch(`http://localhost:3000/favorites/${id}`, {
          method: 'DELETE',
        });
        setFavorites(favorites.filter((favorite) => favorite.id !== id));
      } else {
        const updatedProducts = products.map((product) =>
          product.id === id ? { ...product, animate: true } : product
        );
        setProducts(updatedProducts);

        setTimeout(async () => {
          await fetch('http://localhost:3000/favorites', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedProduct),
          });
          setFavorites([...favorites, selectedProduct]);


          const resetAnimation = products.map((product) =>
            product.id === id ? { ...product, animate: false } : product
          );
          setProducts(resetAnimation);
        }, 500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const ImgStyle = {
    width: '100px',
    height: '100px',
  };

  return (
    <div>
      <Link className='NavMenu' to="/favorits">Go to favorites</Link>

      {products.map((product) => (
        <ul key={product.id} className={`container ${product.animate ? 'product-animation' : ''}`}>
          <img style={ImgStyle} src={product.img} alt="error" className="image" />
          <li>{product.name}</li>
          <button onClick={() => addToFavorites(product.id)} className="favorite-button">
            {favorites.some((favorite) => favorite.id === product.id) ? 'delete favorite' : 'add to favorites'}
          </button>
        </ul>
      ))}
    </div>
  );
};

export default App;
