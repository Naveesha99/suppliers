import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axiosClient';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(0); // Total pages state

  useEffect(() => {
    getSuppliers(currentPage); // Fetch suppliers based on the current page
  }, [currentPage]);

  const onDeleteClick = supplier => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) {
      return;
    }
    axiosClient.delete(`/suppliers/${supplier.id}`)
      .then(() => {
        getSuppliers(currentPage);
      });
  };

  const getSuppliers = (page) => {
    setLoading(true);
    axiosClient.get(`/suppliers?page=${page}`) // Request suppliers by page
      .then(({ data }) => {
        setLoading(false);
        setSuppliers(data.data);
        setTotalPages(data.meta.last_page); 
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // Set the new page and fetch data for that page
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Suppliers</h1>
        <Link className="btn-add" to="/supplier">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Supplier name</th>
            <th>Contact Person</th>
            <th>Phone</th>
            <th>Actions</th>
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
            {suppliers.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.supplierName}</td>
                <td>{u.contactPerson}</td>
                <td>{u.phone}</td>
                <td>
                  <Link className="btn-edit" to={'/supplier/' + u.id}>Edit</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={() => onDeleteClick(u)}>Delete</button>
                  &nbsp;
                  <Link className="btn-view" to={'/products/' + u.id}>Product</Link>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>

        {/* Pagination controls */}
        <div className="pagination">
          <button className='btn-page'
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}>
            Previous
          </button>

          <span>Page {currentPage} of {totalPages}</span>

          <button className='btn-page' 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
