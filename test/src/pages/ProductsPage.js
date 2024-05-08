import React, { useState } from 'react';
import ProductList from '../product/ProductList';
import SearchProduct from '../product/SearchProduct';
import CreateNewProduct from '../product/CreateNewProduct';
// import EditProductForm from '../components/EditProductForm';

const ProductsPage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Product 1',
      image: '..\product\product.jpg',
      origin: 'USA',
      pricePerUnit: 10,
      unit: 'kg',
      quantity: 100
    },
    {
      id: 2,
      name: 'Product 2',
      image: '..\product\product.jpg',
      origin: 'Vietnam',
      pricePerUnit: 8,
      unit: 'kg',
      quantity: 50
    },
    {
      id: 3,
      name: 'Product 3',
      image: '..\product\product.jpg',
      origin: 'Japan',
      pricePerUnit: 15,
      unit: 'g',
      quantity: 200
    },
    // Add more sample products here if needed
  ]);

  const [searchedProduct, setSearchedProduct] = useState([]); // State to store search results

  const [isCreating, setIsCreating] = useState(false); // State to control create new product form

  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  // Function to handle creation of a new product
  const handleCreateProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    setIsCreating(false); // Close create new product form after creation
  };

  // Function to handle cancel create new product
  const handleCancelCreate = () => {
    setIsCreating(false);
  };

  // Function to handle search
  const handleSearchProduct = (searchedProduct) => {
    setSearchedProduct(searchedProduct);
  };

  const handleViewDetalProduct = (productId) => {
    // update
  }

  // Function to handle deletion of a product
  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  // Function to handle editing of a product
  const handleEditProduct = (productId) => {
    setEditingProductId(productId);
    setIsEditing(true);
  };

  return (
    <div>
      <h2>Products Page</h2>
      <SearchProduct products={products} onSearch={handleSearchProduct} />
      {!isCreating && (
        <button onClick={() => setIsCreating(true)}>Create New Product</button>
      )}
      {isCreating && (
        <CreateNewProduct products={products} onCreate={handleCreateProduct} onCancel={handleCancelCreate} />
      )}
      <ProductList 
        products={searchedProduct.length == 0 ? products : searchedProduct} 
        onViewDetail={handleViewDetalProduct}
        onDelete={handleDeleteProduct} 
        onEdit={handleEditProduct} 
      />
      {/* {isEditing && (
        <EditProductForm 
          productId={editingProductId} 
          products={products} 
          onUpdate={(updatedProduct) => {
            const updatedProducts = products.map(product => {
              if (product.id === updatedProduct.id) {
                return updatedProduct;
              }
              return product;
            });
            setProducts(updatedProducts);
            setIsEditing(false);
          }} 
          onCancel={() => setIsEditing(false)} 
        />
      )} */}
    </div>
  );
};

export default ProductsPage;
