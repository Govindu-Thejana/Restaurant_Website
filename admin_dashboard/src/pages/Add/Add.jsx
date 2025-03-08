import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    category: 'Salad',
    price: ''
  });
  const [errors, setErrors] = useState({});

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
    setErrors((errors) => ({ ...errors, [name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!data.name) newErrors.name = 'Product name is required';
    if (!data.description) newErrors.description = 'Product description is required';
    if (!data.price || isNaN(Number(data.price))) newErrors.price = 'Invalid price';
    if (!image) newErrors.image = 'Product image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("image", image);

      console.log("Submitting Data:", Object.fromEntries(formData.entries())); // Debugging

      const response = await axios.post(`${url}/api/products/add`, formData); // Fixed template literal

      if (response.data.success) {
        alert('Product added successfully');
        setData({
          name: '',
          description: '',
          category: 'Salad',
          price: ''
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add product. Please check your connection.");
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler} encType="multipart/form-data">
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input type="file" id="image" hidden required onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
          <input onChange={onChangeHandler} value={data.name} name="name" type="text" placeholder='Enter product name' />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Enter product description'></textarea>
        </div>

        <div className="add-category-price">
          <p>Product category</p>
          <select name="category" id="category" onChange={onChangeHandler} value={data.category}> 
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
        </div>

        <div className="add-price flex-col">
          <p>Product price</p>
          {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
          <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='Rs:20' />
        </div>

        <button type="submit" className='add-btn'>Add</button>
      </form>
    </div>
  );
};

export default Add;
