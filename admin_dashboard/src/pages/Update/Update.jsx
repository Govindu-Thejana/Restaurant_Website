import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Update.css';

const UpdateProduct = ({ url }) => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: '',
        image: null,
        imageUrl: '', // To store the URL of the current image
    });

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${url}/api/products/${productId}`);
            if (response.data.success) {
                setProduct({
                    name: response.data.product.name,
                    category: response.data.product.category,
                    price: response.data.product.price,
                    imageUrl: `${url}/uploads/${response.data.product.image}`,
                });
            } else {
                toast.error("Error fetching product");
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            toast.error("Failed to fetch product");
        }
    };

    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('category', product.category);
            formData.append('price', product.price);
            if (product.image) {
                formData.append('image', product.image);
            }

            const response = await axios.put(`${url}/api/products/${productId}`, formData);

            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/list'); // Navigate back to the list page
            } else {
                toast.error("Error updating product");
            }
        } catch (error) {
            console.error("Update Error:", error);
            toast.error("Failed to update product");
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProduct({ ...product, image: file });
        const reader = new FileReader();
        reader.onloadend = () => {
            setProduct({ ...product, imageUrl: reader.result });
        };
        if (file) reader.readAsDataURL(file);
    };

    return (
        <div className="update-container">
            <header className="update-header">
                <h2 className="update-title">Update Product</h2>
            </header>
            <main className="update-content">
                <form onSubmit={updateProduct} className="update-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="name">Product Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={product.name}
                                onChange={handleInputChange}
                                placeholder="Enter product name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category:</label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={product.category}
                                onChange={handleInputChange}
                                placeholder="Enter category"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price (Rs):</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={product.price}
                                onChange={handleInputChange}
                                placeholder="Enter price"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>
                        <div className="form-group full-width">
                            <label htmlFor="image">Product Image:</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                            {product.imageUrl && (
                                <div className="image-preview">
                                    <img
                                        src={product.imageUrl}
                                        alt="Product Preview"
                                        className="product-image-preview"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="update-btn">Save Changes</button>
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate('/list')}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default UpdateProduct;