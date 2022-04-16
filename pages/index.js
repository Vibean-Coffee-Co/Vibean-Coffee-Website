import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import client from '../utils/client';

export default function Home() {
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
  return (
    <Layout>
      {loading ? (
        <a>loading...</a>
      ) : error ? (
        <a>{error}</a>
        ) : (
          <div className='mx-36 grid grid-cols-4 gap-4 h-screen'>
            {products.map((product) => (
                <ProductItem key={product.slug} product={product}></ProductItem>
            ))}
          </div>
        )}
    </Layout>
  );
}