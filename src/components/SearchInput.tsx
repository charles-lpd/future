import React from 'react'

interface Props {
  value: string
  updateValue: (value: string) => void
}
const SearchInput: React.FC<Props> = ({ value, updateValue }) => {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => updateValue(e.target.value)}
      />
    </div>
  )
}

export default SearchInput
