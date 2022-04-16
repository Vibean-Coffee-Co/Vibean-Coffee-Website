import Link from 'next/link';
import { urlForThumbnail } from '../utils/image';
import Image from 'next/image'
  
export default function ProductItem({ product }) {
    return (
      <div>
        <Link href={`/product/${product.slug.current}`} passHref>
          <div>
            <Image
              alt={product.name}
              src={urlForThumbnail(product.image)}
              width="300"
              height="300"
            ></Image>
            <div>
              <a>{product.name}</a>
              <div>
              <a>
                ⭐️{product.rating} ({product.numReviews} reviews)
              </a>
              </div>
            </div>
          </div>
        </Link>
        <a>₹{product.price}</a>
        <div>
          <button className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
            Add to cart
          </button>
        </div>
      </div>
    );
}