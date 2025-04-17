"use client";
import React, { useState } from "react";

const Form = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add your form submission logic here (e.g., API call)
  };

  return (
    <div className="max-w-md mx-auto p-5 border border-teal-500 rounded-lg bg-gray-50 dir-rtl">
      <h2 className="text-2xl text-teal-500 text-center mb-5">تماس با ما</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm mb-2">
            نام و نام خانوادگی
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="نام خود را وارد کنید"
            className="w-full p-2 text-sm border border-gray-300 rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm mb-2">
            ایمیل
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ایمیل خود را وارد کنید"
            className="w-full p-2 text-sm border border-gray-300 rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 text-sm mb-2">
            شماره تماس
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="شماره تماس خود را وارد کنید"
            className="w-full p-2 text-sm border border-gray-300 rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 text-sm mb-2">
            آدرس
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="آدرس خود را وارد کنید"
            className="w-full p-2 text-sm border border-gray-300 rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 text-sm mb-2">
            پیام
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="پیام خود را بنویسید"
            rows={4}
            className="w-full p-2 text-sm border border-gray-300 rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-y"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-teal-500 text-white rounded text-base hover:bg-teal-600 transition"
        >
          ارسال
        </button>
      </form>
    </div>
  );
};

export default Form;
