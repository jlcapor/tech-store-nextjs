"use client";

import { useEffect, useState } from 'react';
import { api } from '@/trpc/react';
import { type Product } from '@/server/db/schema';

interface UpdateProductFormProps {
    product: Product
}

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({ product }) => {
    return (
        <div>
            <h1>Update Product</h1>
           {product.name}
        </div>
    );
};

export default UpdateProductForm;