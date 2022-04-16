import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import client from '../../utils/client';
import { urlFor, urlForThumbnail } from '../../utils/image';
import { Store } from '../../utils/Store';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ProductScreen(props) {
    const router = useRouter();
    const { slug } = props;
    const {
        state: { cart },
        dispatch,
      } = useContext(Store);
    const [state, setState] = useState({
      product: null,
      loading: true,
      error: '',
    });
    const { product, loading, error } = state;
    useEffect(() => {
      const fetchData = async () => {
        try {
          const product = await client.fetch(
            `
              *[_type == "product" && slug.current == $slug][0]`,
            { slug }
          );
          setState({ ...state, product, loading: false });
        } catch (err) {
          setState({ ...state, error: err.message, loading: false });
        }
      };
      fetchData();
    }, []);
  
    const addToCartHandler = async () => {
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
      <Layout title={product?.title}>
        {loading ? (
          <a>loading...</a>
        ) : error ? (
          <a>{error}</a>
        ) : (
            <div>
            <div>
              <Link href="/" passHref>
                <Link>
                  <a>Back to result</a>
                </Link>
              </Link>
            </div>

                <Image
                  src={urlFor(product.image)}
                  alt={product.name}
                  width="300"
                  height="300"
                />

                    <a>
                      {product.name}
                    </a>

                  <div>Category: {product.category}</div>

                    <div>
                    <a value={product.rating} readOnly></a></div>

                    <div>
                    <a>
                      ({product.numReviews} reviews)
                    </a></div>

                    <div>
                    <a>Description: {product.description}</a>
                    </div>
                    <div>
                          <a>Price</a>

                          <a>${product.price}</a>
                    </div>
                    
                    <div>
                          <a>Status</a>

                          <a>
                            {product.countInStock > 0
                              ? 'In stock'
                              : 'Unavailable'}
                    </a>
                    </div>

                <button onClick={addToCartHandler}>Add to cart</button>
            </div>

        )}
      </Layout>
    );
  }
  
export function getServerSideProps(context) {
    return {
      props: { slug: context.params.slug },
    };
}