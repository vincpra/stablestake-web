import classNames from 'classnames'
import Check from 'components/svg/Check'
import { calcRem } from 'utils/styles'

interface CheckboxProps {
  isChecked: boolean
}

export const Checkbox = ({ isChecked }: CheckboxProps) => {
  return (
    <div
      className={classNames(
        'flex justify-center items-center border-2 rounded hover:border-blue-light hover:border-opacity-70 bg-white',
        'border-purple communism:border-communism capitalism:border-capitalism fascism:border-fascism',
        { 'opacity-40': isChecked }
      )}
      style={{ width: calcRem(20), height: calcRem(20) }}
    >
      <Check
        className={classNames(
          'text-purple communism:text-communism capitalism:text-capitalism fascism:text-fascism fill-current',
          isChecked ? 'flex' : 'hidden'
        )}
        style={{ width: calcRem(10), height: calcRem(10) }}
      />
    </div>
  )
}
