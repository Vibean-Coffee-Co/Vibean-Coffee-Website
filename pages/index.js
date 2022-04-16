import { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useRouter } from 'next/router';
import ProductItem from '../components/ProductItem';
import client from '../utils/client';
import { urlForThumbnail } from '../utils/image';
import { Store } from '../utils/Store';

export default function Home() {
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);
  const router = useRouter();
  const [state, setState] = useState({
    products: [],
    error: '',
    loading: true,
  });
  const { loading, error, products } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch(`*[_type == "product"]`);
        setState({ products, loading: false });
      } catch (err) {
        setState({ loading: false, error: err.message });
      }
    };
    fetchData();
  }, []);

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        _key: product._id,
        name: product.name,
        countInStock: product.countInStock,
        slug: product.slug.current,
        price: product.price,
        image: urlForThumbnail(product.image),
        quantity,
      },
    });
    alert(`${product.name} added to the cart`);
    router.push('/cart');
  };

  return (
    <Layout>
      {loading ? (
        <a>loading...</a>
      ) : error ? (
        <a>{error}</a>
        ) : (
          <div className='mx-36 grid grid-cols-4 gap-4 h-screen'>
            {products.map((product) => (
                <ProductItem 
                key={product.slug} 
                product={product}
                addToCartHandler={addToCartHandler}
                ></ProductItem>
            ))}
          </div>
        )}
    </Layout>
  );
}