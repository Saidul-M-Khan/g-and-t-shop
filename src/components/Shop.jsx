import React, { useContext, useState } from 'react';
import ProductCard from './Cards/ProductCard';
import { addToDB } from '../utils/fakeDB';
import { CartContext, ProductContext } from '../App';
import toast from 'react-hot-toast';

const Shop = () => {

    const products = useContext(ProductContext)
    const [cart, setCart] = useContext(CartContext);
    
    const handleAddToCart = (product) => {

        let newCart = [];
        const foundProduct = cart.find((existingProduct) => existingProduct.id === product.id);

        if (!foundProduct) {
            product.quantity = 1;
            newCart = [...cart, product];
        } else{
            const restOfTheItems = cart.filter((existingProduct) => existingProduct.id !== product.id);
            foundProduct.quantity++;
            newCart = [...restOfTheItems, foundProduct];
        }
        
        toast.success("Product added to cart!");
        setCart(newCart);
        addToDB(product.id);
    };

    return (
        <>
            <h1 className='title-text text-4xl text-center'>Shop</h1>
            <div className='product-container'>
            {products.map((product) => (<ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart}/>))}
            </div>   
        </>
    );
};

export default Shop;