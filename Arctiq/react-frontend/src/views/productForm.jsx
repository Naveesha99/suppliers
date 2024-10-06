import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../axiosClient';

export default function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate
    const [supplier, setSupplier] = useState({
        id: null,
        supplierName: ''
    });
    const [product, setProduct] = useState({
        supplierId: id,
        productName: '',
        productPrice: '',
        image: null
    });

    const handleFileChange = (ev) => {
        const file = ev.target.files[0]; // Get the selected file
        setProduct({ ...product, image: file });
    };

    useEffect(() => {
        if (id) {
            axiosClient.get(`/supplier/${id}`)
            .then(({ data }) => {
                setSupplier({
                    id: data.id || null,
                    supplierName: data.supplierName || ''
                });
            });
        }
    }, [id]);

    const onSubmit = ev => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('supplierId', product.supplierId);
        formData.append('productName', product.productName);
        formData.append('productPrice', product.productPrice);
        
        // Append image only if it exists
        if (product.image) {
            formData.append('image', product.image);
        }
        
        // Logging FormData content for debugging
        // for (let pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }

        axiosClient.post('/product', formData)
        .then(() => {
            navigate(`/products/${id}`);
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                console.log(response.data.errors);
            }
        });
    };
    
    return (
        <>
            <h1>Add New Product - {supplier.supplierName}</h1>
            <div className="card animated fadeInDown">
                <form onSubmit={onSubmit}>
                    <input 
                        type='text' 
                        value={product.productName} 
                        onChange={ev => setProduct({ ...product, productName: ev.target.value })} 
                        placeholder="Product Name" 
                    />
                    <input 
                        type='text' 
                        value={product.productPrice} 
                        onChange={ev => setProduct({ ...product, productPrice: ev.target.value })} 
                        placeholder="Product Price" 
                    />
                    <input 
                        type='file' 
                        accept="image/*"
                        onChange={handleFileChange} 
                    />
                    <button type="submit" className="btn">Save</button>
                </form>
            </div>
        </>
    );
}
