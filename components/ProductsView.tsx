
import React from 'react'
import { Product,Category } from '@/sanity.types'
import ProductGrid from './ProductGrid'


interface ProductsViewProps {
    products : Product[],
    categories : Category[]
}

const ProductsView = ({products,categories}:ProductsViewProps) => {
  return (
    <div className='mx-4 my-2 flex flex-col'>
        {/* categories */}
        <div className='w-full sm:w-[200px]'>
            {/* <CategorySelectorComponent categories = {categories}/> */}

        </div>

        {/* products */}
        <div className='flex-1 '>
            <div>
                <ProductGrid products ={products}/>

                <hr className="mt-6 w-full max-w-4xl mx-auto border-t border-gray-300" />

            </div>
        </div>
    </div>
  )
}

export default ProductsView