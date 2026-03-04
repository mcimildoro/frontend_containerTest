import { useState } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import ItemModal from './Modal/ItemModal'

const INITIAL_ITEMS = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

type Snapshot = { items: string[]; selected: string | null }

export default function ListboxCard() {
  const [items, setItems] = useState(INITIAL_ITEMS)
  const [selected, setSelected] = useState<string | null>('Item 2')
  const [inputValue, setInputValue] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [history, setHistory] = useState<Snapshot[]>([])

  function saveSnapshot() {
    setHistory((prev) => [...prev, { items, selected }])
  }

  function handleDelete(item?: string) {
    const target = item ?? selected
    if (!target) return
    saveSnapshot()
    const next = items.filter((i) => i !== target)
    setItems(next)
    setSelected(next[0] ?? null)
  }

  function handleAdd() {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    saveSnapshot()
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

 

  function handleUndo() {
    const prev = history[history.length - 1]
    if (!prev) return
    setItems(prev.items)
    setSelected(prev.selected)
    setHistory((h) => h.slice(0, -1))
  }

  return (
    <div className="background_container">
      <div className="card_container">
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
        <ScrollArea.Root className="item_container">
          <ScrollArea.Viewport className="scroll_viewport">
            {items.map((item) => (
              <div
                key={item}
                onClick={() => setSelected(item)}
                onDoubleClick={() => handleDelete(item)}
                className={`list_item${selected === item ? ' selected' : ''}`}
              >
                {item}
              </div>
            ))}
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical" className="scroll_bar">
            <ScrollArea.Thumb className="scroll_thumb" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>

        {/* Actions */}
        <div className="card_actions">
          <div className="card_actions_left">
            <button onClick={handleUndo} disabled={history.length === 0} className="btn_reset">
              <CounterClockwiseClockIcon className="btn_icon" />
            </button>
            <button onClick={() => handleDelete()} disabled={!selected} className="btn_delete">
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
