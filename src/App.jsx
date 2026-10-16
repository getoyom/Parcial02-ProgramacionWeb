import { useState } from 'react'
import {
  Armchair,
  Bell,
  Boxes,
  Check,
  ChevronDown,
  CircleHelp,
  HardDrive,
  Headphones,
  Keyboard,
  LayoutDashboard,
  Mic,
  Monitor,
  Mouse,
  Package,
  Plus,
  Search,
  X,
} from 'lucide-react'
import './App.css'

const initialProducts = [
  { sku: 'MON-LG-27', name: 'Monitor LG UltraWide 27"', category: 'Computación', price: 1899, stock: 12, icon: Monitor, tint: 'mint' },
  { sku: 'AUD-SNY-05', name: 'Audífonos Sony WH-1000XM5', category: 'Audio', price: 2699, stock: 7, icon: Headphones, tint: 'rose' },
  { sku: 'TEC-KCH-K2', name: 'Teclado Keychron K2 Pro', category: 'Accesorios', price: 1120, stock: 24, icon: Keyboard, tint: 'blue' },
  { sku: 'MOU-LOG-3S', name: 'Mouse Logitech MX Master 3S', category: 'Accesorios', price: 849, stock: 3, icon: Mouse, tint: 'yellow' },
  { sku: 'SSD-SAM-T7', name: 'SSD portátil Samsung T7 1 TB', category: 'Computación', price: 999, stock: 0, icon: HardDrive, tint: 'lavender' },
  { sku: 'MIC-ROD-NT', name: 'Micrófono Rode NT-USB Mini', category: 'Audio', price: 1450, stock: 8, icon: Mic, tint: 'peach' },
  { sku: 'SIL-ERG-01', name: 'Silla ergonómica Basic', category: 'Oficina', price: 2450, stock: 2, icon: Armchair, tint: 'mint' },
]

const currency = new Intl.NumberFormat('es-GT', {
  style: 'currency',
  currency: 'GTQ',
  maximumFractionDigits: 2,
})

function getStockStatus(stock) {
  if (stock === 0) return { label: 'Agotado', className: 'out' }
  if (stock <= 5) return { label: 'Stock bajo', className: 'low' }
  return { label: 'Disponible', className: 'available' }
}

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todas')
  const [isFormOpen, setIsFormOpen] = useState(false)

  const categories = ['Todas', ...new Set(products.map((product) => product.category))]
  const normalizedQuery = query.trim().toLocaleLowerCase('es')
  const filteredProducts = products.filter((product) => {
    const matchesQuery = [product.name, product.sku, product.category]
      .some((value) => value.toLocaleLowerCase('es').includes(normalizedQuery))
    return matchesQuery && (category === 'Todas' || product.category === category)
  })
  const inventoryValue = products.reduce((total, product) => total + product.price * product.stock, 0)
  const lowStockCount = products.filter((product) => product.stock > 0 && product.stock <= 5).length
  const totalUnits = products.reduce((total, product) => total + product.stock, 0)

  function addProduct(product) {
    setProducts((currentProducts) => [product, ...currentProducts])
    setCategory('Todas')
    setQuery('')
    setIsFormOpen(false)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#productos" aria-label="Nexo, ir al inventario">
          <span className="brand-mark"><Boxes size={20} strokeWidth={2.2} /></span>
          <span className="brand-name">nexo<span>.</span><small>GESTIÓN DE INVENTARIO</small></span>
        </a>
        <div className="sidebar-caption">ESPACIO DE TRABAJO</div>
        <nav className="sidebar-nav" aria-label="Navegación principal">
          <a className="nav-link active" href="#productos" aria-current="page">
            <LayoutDashboard size={18} /> <span>Productos</span>
          </a>
        </nav>
        <div className="sidebar-footer">
          <div className="database-indicator"><span /> SQL Server</div>
          <a className="help-link" href="#base-de-datos"><CircleHelp size={17} /> Esquema de datos</a>
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <div className="breadcrumb"><span>Inventario</span><span className="breadcrumb-separator">/</span><strong>Productos</strong></div>
          <div className="topbar-actions">
            <span className="save-state"><span /> Datos de demostración</span>
            <button className="icon-button notification-button" type="button" aria-label="Notificaciones">
              <Bell size={18} /><i />
            </button>
            <div className="user-avatar" aria-label="Perfil de usuario">GM</div>
          </div>
        </header>

        <main id="productos" className="main-content">
          <div className="page-heading">
            <div>
              <div className="eyebrow"><span>CATÁLOGO</span><span className="eyebrow-line" /></div>
              <h1>Productos</h1>
              <p>Administra tu catálogo y mantén el inventario al día.</p>
            </div>
            <button className="primary-button" type="button" onClick={() => setIsFormOpen(true)}>
              <Plus size={18} strokeWidth={2.5} /> Agregar producto
            </button>
          </div>

          <section className="metrics" aria-label="Resumen del inventario">
            <Metric label="Productos" value={products.length} note="en el catálogo" icon={Package} />
            <Metric label="Unidades disponibles" value={totalUnits} note="en todas las ubicaciones" icon={Boxes} />
            <Metric label="Stock bajo" value={lowStockCount} note="requieren atención" icon={Bell} accent="warning" />
            <Metric label="Valor del inventario" value={currency.format(inventoryValue)} note="al precio actual" icon={Check} />
          </section>

          <section className="catalog-section" aria-labelledby="catalog-title">
            <div className="catalog-heading">
              <div>
                <h2 id="catalog-title">Todos los productos <span className="result-count">{filteredProducts.length}</span></h2>
                <p>Consulta y filtra los artículos de tu inventario.</p>
              </div>
              <div className="catalog-tools">
                <label className="search-field">
                  <Search size={17} aria-hidden="true" />
                  <input
                    type="search"
                    placeholder="Buscar producto o SKU"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    aria-label="Buscar productos por nombre, SKU o categoría"
                  />
                  {query && <button type="button" className="clear-search" onClick={() => setQuery('')} aria-label="Limpiar búsqueda"><X size={15} /></button>}
                </label>
                <label className="category-select">
                  <span className="sr-only">Filtrar por categoría</span>
                  <select value={category} onChange={(event) => setCategory(event.target.value)}>
                    {categories.map((item) => <option key={item} value={item}>{item === 'Todas' ? 'Todas las categorías' : item}</option>)}
                  </select>
                  <ChevronDown size={15} aria-hidden="true" />
                </label>
              </div>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th scope="col">Producto</th><th scope="col">Categoría</th><th scope="col">Precio</th><th scope="col">Existencias</th><th scope="col">Estado</th></tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => <ProductRow key={product.sku} product={product} />)}
                </tbody>
              </table>
              {filteredProducts.length === 0 && (
                <div className="empty-state">
                  <Search size={22} />
                  <strong>No encontramos productos</strong>
                  <span>Prueba con otro nombre, SKU o categoría.</span>
                  <button type="button" onClick={() => { setQuery(''); setCategory('Todas') }}>Limpiar filtros</button>
                </div>
              )}
            </div>
            <div className="table-footer"><span>Mostrando <strong>{filteredProducts.length}</strong> de <strong>{products.length}</strong> productos</span><span className="table-footer-note"><span /> Inventario actualizado</span></div>
          </section>

          <footer id="base-de-datos" className="page-footer">
            <span>Diseñado para conectar con SQL Server</span>
            <a href="/database/schema.sql" target="_blank" rel="noreferrer">Ver esquema SQL <span aria-hidden="true">↗</span></a>
          </footer>
        </main>
      </div>

      {isFormOpen && <AddProductDialog categories={categories.filter((item) => item !== 'Todas')} existingSkus={products.map((product) => product.sku)} onClose={() => setIsFormOpen(false)} onSave={addProduct} />}
    </div>
  )
}

function Metric({ label, value, note, icon: Icon, accent }) {
  return (
    <div className="metric">
      <div className={`metric-icon ${accent || ''}`}><Icon size={17} /></div>
      <div className="metric-copy"><span className="metric-label">{label}</span><strong>{value}</strong><span className="metric-note">{note}</span></div>
    </div>
  )
}

function ProductRow({ product }) {
  const status = getStockStatus(product.stock)
  const Icon = product.icon || Package
  const stockWidth = Math.min((product.stock / 30) * 100, 100)

  return (
    <tr>
      <td><div className="product-cell"><span className={`product-art ${product.tint || 'mint'}`}><Icon size={19} strokeWidth={1.8} /></span><span className="product-copy"><strong>{product.name}</strong><small>{product.sku}</small></span></div></td>
      <td><span className="category-name">{product.category}</span></td>
      <td className="price-cell">{currency.format(product.price)}</td>
      <td><div className="stock-cell"><span>{product.stock} <small>unid.</small></span><span className="stock-track"><i style={{ width: `${stockWidth}%` }} /></span></div></td>
      <td><span className={`status-pill ${status.className}`}><i />{status.label}</span></td>
    </tr>
  )
}

function AddProductDialog({ categories, existingSkus, onClose, onSave }) {
  const [form, setForm] = useState({ name: '', sku: '', category: categories[0] || 'Computación', price: '', stock: '' })
  const [skuError, setSkuError] = useState('')

  function updateField(event) {
    setForm((currentForm) => ({ ...currentForm, [event.target.name]: event.target.value }))
    if (event.target.name === 'sku') setSkuError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const normalizedSku = form.sku.trim().toLocaleUpperCase('es')
    if (existingSkus.some((sku) => sku.toLocaleUpperCase('es') === normalizedSku)) {
      setSkuError('Este SKU ya existe en el catálogo.')
      return
    }
    onSave({ ...form, name: form.name.trim(), sku: normalizedSku, price: Number(form.price), stock: Number(form.stock), icon: Package, tint: 'mint' })
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="product-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <div className="dialog-heading"><div><span className="dialog-kicker">CATÁLOGO</span><h2 id="dialog-title">Nuevo producto</h2><p>Agrega un artículo al inventario.</p></div><button className="icon-button" type="button" onClick={onClose} aria-label="Cerrar"><X size={19} /></button></div>
        <form onSubmit={handleSubmit}>
          <label className="form-field full-width"><span>Nombre del producto</span><input name="name" value={form.name} onChange={updateField} placeholder='Ej. Monitor UltraWide 27"' maxLength="160" required autoFocus /></label>
          <div className="form-grid">
            <label className="form-field"><span>SKU</span><input name="sku" value={form.sku} onChange={updateField} placeholder="MON-LG-27" maxLength="32" aria-invalid={Boolean(skuError)} aria-describedby={skuError ? 'sku-error' : undefined} required />{skuError && <small className="field-error" id="sku-error">{skuError}</small>}</label>
            <label className="form-field"><span>Categoría</span><select name="category" value={form.category} onChange={updateField}>{[...new Set([...categories, 'Computación', 'Audio', 'Accesorios', 'Oficina'])].map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
            <label className="form-field"><span>Precio (Q)</span><input name="price" type="number" min="0.01" step="0.01" value={form.price} onChange={updateField} placeholder="0.00" required /></label>
            <label className="form-field"><span>Existencias</span><input name="stock" type="number" min="0" step="1" value={form.stock} onChange={updateField} placeholder="0" required /></label>
          </div>
          <div className="dialog-actions"><button className="secondary-button" type="button" onClick={onClose}>Cancelar</button><button className="primary-button" type="submit"><Plus size={17} /> Guardar producto</button></div>
        </form>
      </section>
    </div>
  )
}

export default App
