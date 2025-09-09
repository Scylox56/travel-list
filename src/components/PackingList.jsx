import { useState } from 'react'
import Item from './Item'
import ConfirmationModal from './ConfirmationModal'

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  clearItemList,
}) {
  const [sortBy, setSortBy] = useState('input')
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  let sortedItems

  if (sortBy === 'input') sortedItems = items
  if (sortBy === 'description')
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description))

  if (sortBy === 'packed')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed))

  const handleClearClick = () => {
    setShowConfirmModal(true)
  }

  const handleConfirmClear = () => {
    clearItemList()
    setShowConfirmModal(false)
  }

  const handleCancelClear = () => {
    setShowConfirmModal(false)
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={handleClearClick}>Clear list</button>
      </div>

      <ConfirmationModal
        isOpen={showConfirmModal}
        onConfirm={handleConfirmClear}
        onCancel={handleCancelClear}
        title="Clear All Items"
        message="Are you sure you want to delete all items from your packing list? This action cannot be undone."
      />
    </div>
  )
}
