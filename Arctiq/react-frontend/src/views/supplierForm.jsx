import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function SupplierForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState({
        id: null,
        supplierName: '',
        contactPerson: '',
        phone: ''
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

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

    const onSubmit = ev => {
        ev.preventDefault();
        if (supplier.id) {
            axiosClient.put(`/supplier/${supplier.id}`, supplier)
                .then(() => {
                    navigate('/');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient.post('/supplier', supplier)
                .then(() => {
                    navigate('/');
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            {supplier.id ? <h1>Update Supplier: {supplier.supplierName}</h1> : <h1>New Supplier</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input value={supplier.supplierName} onChange={ev => setSupplier({ ...supplier, supplierName: ev.target.value })} placeholder="Supplier Name" />
                        <input value={supplier.contactPerson} onChange={ev => setSupplier({ ...supplier, contactPerson: ev.target.value })} placeholder="Contact Person" />
                        <input value={supplier.phone} onChange={ev => setSupplier({ ...supplier, phone: ev.target.value })} placeholder="Phone" />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
}
