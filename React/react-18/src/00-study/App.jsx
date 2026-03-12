import { useState } from 'react'
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  )
}

function ProductRow({ product }) {
  const name = product.stocked
    ? product.name
    : <span style={{ color: 'red' }}>
      {product.name}
    </span>

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  )
}

function ProductTable({ products, filterText, instockOnly }) {
  const rows = []
  let lastCategory = null

  products.forEach((product) => {
    if (!product.name.toLowerCase().includes(filterText.toLowerCase())) {
      return
    }
    if (instockOnly && !product.stocked) {
      return
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />,
      )
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />,
    )
    lastCategory = product.category
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function SearchBar({ filterText, instockOnly, setFilterText, setInstockOnly }) {
  return (
    <form>
      <input type="text" placeholder="Search..." value={filterText} onChange={e => setFilterText(e.target.value)} />
      <label>
        <input type="checkbox" checked={instockOnly} onChange={e => setInstockOnly(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  )
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('')
  const [instockOnly, setInstockOnly] = useState(false)

  return (
    <div>
      <SearchBar filterText={filterText} instockOnly={instockOnly} setFilterText={setFilterText} setInstockOnly={setInstockOnly} />
      <ProductTable products={products} filterText={filterText} instockOnly={instockOnly} />
    </div>
  )
}

const PRODUCTS = [
  { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
  { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
  { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
  { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
  { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
  { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
]

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />
}
