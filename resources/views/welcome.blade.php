<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Products List with Modal Edit</title>
  <link rel="stylesheet" href="{{ asset('css/products.css') }}">
</head>
<body>

<h1>Products List</h1>

<table id="productTable">
  <thead>
    <tr>

      <th>Name</th>
      <th>Description</th>
      <th>Price (USD)</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody id="productListBody">

  </tbody>
</table>

<h2>Add New Product</h2>
<form id="addProductForm">
  <input type="text" id="name" placeholder="Product Name" required />
  <textarea id="description" placeholder="Description" rows="3" required></textarea>
  <input type="number" id="price" placeholder="Price (USD)" required />
  <button type="submit">Add Product</button>
</form>

<div id="editModal" class="modal" aria-hidden="true" role="dialog" aria-labelledby="editModalTitle">
  <div class="modal-content">
    <button class="modal-close" aria-label="Close modal" onclick="closeModal()">&times;</button>
    <h3 id="editModalTitle">Edit Product</h3>
    <form id="editProductForm">
      <input type="hidden" id="editProductId" />
      <label for="editName">Name</label>
      <input type="text" id="editName" required />
      <label for="editDescription">Description</label>
      <textarea id="editDescription" rows="3" required></textarea>
      <label for="editPrice">Price (USD)</label>
      <input type="number" id="editPrice" required />
      <button type="submit">Save Changes</button>
    </form>
  </div>
</div>

<script>
  window.apiBaseUrl = "{{ url('/api/products') }}";
</script>
<script src="{{ asset('js/products.js') }}"></script>
</body>
</html>
