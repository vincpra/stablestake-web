import React, { ReactNode, useState } from 'react'
import { calcRem } from '../../../utils/styles'
import { BsChevronDown } from 'react-icons/bs'
import classNames from 'classnames'
interface QuestionProps {
  question: string
  isOpenDefault?: boolean
  isTitle?: boolean
  children: ReactNode
}

export function Question({ question, isOpenDefault, isTitle, children }: QuestionProps) {
  const [isOpen, setIsOpen] = useState(isOpenDefault ?? false)

  return (
    <div className="w-full">
      <button
        className="w-full"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <h3
          className={`flex hover:text-cyan-light items-center justify-between py-3 font-semibold text-left font-heebo transition ease-in-out duration-100 delay-75 ${
            isOpen ? 'text-cyan-light' : 'text-white'
          }`}
          style={{
            fontSize: calcRem(24),
            lineHeight: calcRem(36)
          }}
        >
          {isTitle ? (
            <p style={{ fontSize: calcRem(32) }}>{question}</p>
          ) : (
            <p style={{ fontSize: calcRem(22) }}>{question}</p>
          )}
          <span
            className={classNames(
              'text-white hover:text-cyan-light transition-all duration-100',
              isOpen && 'text-cyan-light rotate-180'
            )}
            style={{ fontSize: calcRem(20) }}
          >
            {/* {isTitle ? (isOpen ? 'Hide' : 'Show') : isOpen ? '-' : '+'} */}
            <BsChevronDown />
          </span>
        </h3>
      </button>

      {isOpen && (
        <div
          className="mt-3 pb-8 text-white text-left font-heebo"
          style={{ fontSize: calcRem(16), lineHeight: calcRem(26) }}
        >
          {children}
        </div>
      )}
    </div>
  )
}
