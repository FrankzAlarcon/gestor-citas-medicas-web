import { Link } from 'react-router-dom'
import { OptionService } from "../../types"

interface Props {
  option: OptionService
}
const Option = ({option}: Props) => {
  return (
    <Link to={option.to}>
      <div className='w-full px-4 py-2 bg-white rounded-md shadow-md hover:scale-[1.01] duration-300'>
        <h2 className='uppercase text-lg font-bold text-gray-900 pb-3'>{option.title}</h2>
        <p className=''>{option.description}</p>        
      </div>
    </Link>
  )
}

export default Option