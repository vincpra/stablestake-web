import { useState } from 'react'

export interface ModalProps {
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
}

export const useModal = (): ModalProps => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return { isModalOpen, setIsModalOpen }
}
