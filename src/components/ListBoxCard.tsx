import { useState } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import ItemModal from './Modal/ItemModal'

const INITIAL_ITEMS = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

export default function ListboxCard() {
  const [items, setItems] = useState(INITIAL_ITEMS)
  const [selected, setSelected] = useState('Item 2')
  const [inputValue, setInputValue] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  function handleDelete() {
    if (!selected) return
    const next = items.filter((i) => i !== selected)
    setItems(next)
    setSelected(next[0] ?? null)
  }

  function handleAdd() {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    setItems([...items, trimmed])
    closeModal()
  }

  function openModal() {
    setInputValue('')
    setModalOpen(true)
  }

  function closeModal() {
    setInputValue('')
    setModalOpen(false)
  }

  function handleReset() {
    setItems(INITIAL_ITEMS)
    setSelected('Item 2')
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center background_container">
      <div className="card_container w-[900px]">
        {/* Header */}
        <h1 className="card_title">
          This is a technical proof
        </h1>
        <p className="card_body">
          Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec
          inceptos. Lacinia habitasse arcu molestie maecenas cursus quam nunc,
          hendrerit posuere augue fames dictumst placerat porttitor, dis mi
          pharetra vestibulum venenatis phasellus.
        </p>

        {/* Listbox */}
        <ScrollArea.Root className="item_container rounded mb-8 h-48 overflow-hidden">
          <ScrollArea.Viewport className="w-full h-full">
            {items.map((item) => (
              <div
                key={item}
                onClick={() => setSelected(item)}
                className={`list_item${selected === item ? ' selected' : ''}`}
              >
                {item}
              </div>
            ))}
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            orientation="vertical"
            className="flex w-2 p-0.5 bg-gray-100"
          >
            <ScrollArea.Thumb className="flex-1 bg-gray-300 rounded-full" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={handleReset} className="btn_reset">
              <CounterClockwiseClockIcon className="w-4 h-4" />
            </button>
            <button onClick={handleDelete} disabled={!selected} className="btn_delete">
              Delete
            </button>
          </div>
          <button onClick={openModal} className="btn_add">
            Add
          </button>
        </div>

        {/* Modal */}
        <ItemModal
          isOpen={modalOpen}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onAdd={handleAdd}
          onClose={closeModal}
        />
      </div>
    </div>
  )
}
