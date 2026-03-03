import { motion, AnimatePresence } from 'framer-motion'
import './ItemModal.css'

interface ItemModalProps {
  isOpen: boolean
  inputValue: string
  onInputChange: (value: string) => void
  onAdd: () => void
  onClose: () => void
}

export default function ItemModal({ isOpen, inputValue, onInputChange, onAdd, onClose }: ItemModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal_overlay"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="modal_box"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <p className="modal_title">Add item to list</p>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onAdd()}
              placeholder="Type the text here..."
              className="modal_input"
            />
            <div className="modal_actions">
              <button onClick={onAdd}  className="modal_btn_add">
                Add
              </button>
              <button onClick={onClose} className="modal_btn_cancel">
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
