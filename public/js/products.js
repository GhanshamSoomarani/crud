async function fetchProducts() {
  try {
    const res = await fetch(window.apiBaseUrl);
    if (!res.ok) throw new Error('Network response not OK');
    const data = await res.json();
    const tbody = document.getElementById('productListBody');
    tbody.innerHTML = '';
    data.data.forEach(product => {
      const tr = document.createElement('tr');
      tr.innerHTML = `

        <td>${product.name}</td>
        <td>${product.description}</td>
        <td class="price">$${product.price}</td>
        <td>
          <div class="btn-group">
            <button class="edit-btn" onclick="openEditModal(${product.id}, '${escapeQuotes(product.name)}', '${escapeQuotes(product.description)}', ${product.price})">Edit</button>
            <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    alert('Failed to fetch products: ' + err.message);
  }
}

function escapeQuotes(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

async function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this product?')) return;
  try {
    const res = await fetch(`${window.apiBaseUrl}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
    fetchProducts();
  } catch (err) {
    alert('Error deleting product: ' + err.message);
  }
}

document.getElementById('addProductForm').addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const description = document.getElementById('description').value.trim();
  const price = document.getElementById('price').value.trim();

  try {
    const res = await fetch(window.apiBaseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price })
    });
    if (!res.ok) throw new Error('Add product failed');
    e.target.reset();
    fetchProducts();
  } catch (err) {
    alert('Error adding product: ' + err.message);
  }
});

function openEditModal(id, name, description, price) {
  document.getElementById('editProductId').value = id;
  document.getElementById('editName').value = name;
  document.getElementById('editDescription').value = description;
  document.getElementById('editPrice').value = price;
  document.getElementById('editModal').style.display = 'block';
  document.getElementById('editModal').setAttribute('aria-hidden', 'false');
}

function closeModal() {
  document.getElementById('editModal').style.display = 'none';
  document.getElementById('editModal').setAttribute('aria-hidden', 'true');
}

document.getElementById('editProductForm').addEventListener('submit', async e => {
  e.preventDefault();
  const id = document.getElementById('editProductId').value;
  const name = document.getElementById('editName').value.trim();
  const description = document.getElementById('editDescription').value.trim();
  const price = document.getElementById('editPrice').value.trim();

  try {
    const res = await fetch(`${window.apiBaseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price })
    });
    if (!res.ok) throw new Error('Update failed');
    closeModal();
    fetchProducts();
  } catch (err) {
    alert('Error updating product: ' + err.message);
  }
}

);

window.onclick = function(event) {
  const modal = document.getElementById('editModal');
  if (event.target === modal) {
    closeModal();
  }
};

fetchProducts();
