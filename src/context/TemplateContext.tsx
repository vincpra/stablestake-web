import React, { useState, FC, createContext, useEffect, useContext } from 'react'

interface ITemplateContext {
  value: any
}

const DEFAULT_TEMPLATE = {
  value: 'something'
}

export const TemplateContext = createContext<ITemplateContext>(DEFAULT_TEMPLATE)

export const TemplateProvider: FC = ({ children }) => {

  const [value, setValue] = useState(DEFAULT_TEMPLATE.value)

  useEffect(() => {
    setValue('something')
  }, [])

  return (
    <TemplateContext.Provider
      value={{
        value
      }}
    >
      {children}
    </TemplateContext.Provider>
  )
}

export const useTemplateContext = () => useContext(TemplateContext)
