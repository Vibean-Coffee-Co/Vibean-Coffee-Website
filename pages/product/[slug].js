import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import client from '../../utils/client';
import { urlFor } from '../../utils/image';

export default function ProductScreen(props) {
    const { slug } = props;
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

                <button>Add to cart</button>
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