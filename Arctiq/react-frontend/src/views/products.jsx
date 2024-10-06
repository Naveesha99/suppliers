import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosClient from '../axiosClient';

export default function products() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);

    const [supplier, setSupplier] = useState({
        id: null,
        supplierName: '',
        contactPerson: '',
        phone: ''
    });

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient.get(`/supplier/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    // Ensure values are not null
                    setSupplier({
                        id: data.id || null,
                        supplierName: data.supplierName || '',
                        contactPerson: data.contactPerson || '',
                        phone: data.phone || ''
                    });
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    useEffect(() =>{
        getProducts();
    },[]);

    const getProducts = () => {
        setLoading(true);
        axiosClient.get(`/products`)
            .then(({ data }) => {
                setLoading(false);
                // Filter products by supplierId
                const filteredProducts = data.data.filter(product => product.supplierId === parseInt(id));
                setProduct(filteredProducts);
            })
            .catch(() => {
                setLoading(false);
            });
    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1>Products : {supplier.supplierName}</h1>
                <Link className="btn-add" to={`/product/${id}`}>New Product</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    {loading &&
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    }
                    {!loading &&
                        <tbody>
                            {product.map(u => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.productName}</td>
                                    <td>{u.productPrice} LKR</td>
                                    <td>
                                        <img 
                                            src={`http://localhost/Arctiq/storage/app/public/${u.image}`} // Replace with your constructed URL
                                            alt={u.productName}
                                            style={{ width: '100px', height: 'auto' }} // Adjust the size as needed
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}
