import axios from 'axios';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

function CartScreen() {
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);


  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        _key: item._key,
        name: item.name,
        countInStock: item.countInStock,
        slug: item.slug,
        price: item.price,
        image: item.image,
        quantity,
      },
    });
    alert(`${item.name} updated in the cart`);
  };
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  return (
    <Layout title="Shopping Cart">
      <div component="h1" variant="h1">
        Shopping Cart
      </div>
      {cartItems.length === 0 ? (
          <div>
            Cart is empty.{' '}
            <Link href="/" passHref>
              <Link>Go shopping</Link>
            </Link>
          </div>
      ) : (
        <div>
          <div>
              <table>
                  <tbody>
                <th>
                  <tr>
                    <td>Image</td>
                    <td>Name</td>
                    <td>Quantity</td>
                    <td>Price</td>
                    <td>Action</td>
                  </tr>
                </th>
                <tr>
                  {cartItems.map((item) => (
                    <tr key={item._key}>
                      <td>
                        <Link href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                          </Link>
                        </Link>
                      </td>
                      <td>
                        <Link href={`/product/${item.slug}`} passHref>
                          <Link>
                            <div>{item.name}</div>
                          </Link>
                        </Link>
                      </td>
                      <td>
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <div>${item.price}</div>
                      </td>
                      <td>
                        <button
                          variant="contained"
                          color="secondary"
                          onClick={() => removeItemHandler(item)}
                        >
                          x
                        </button>
                      </td>
                    </tr>
                  ))}
                </tr>
                </tbody>
            </table>
          </div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : ${' '}
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </div>
                </div>
                <div>
                  <button>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });