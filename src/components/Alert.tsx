
interface Props {
  children: string
  type: 'error' | 'success'
}
const Alert = ({type, children}: Props) => {
  let messageColor = ""

  if (type === 'error') {
    messageColor = "bg-red-600"
  } else if (type === 'success') {
    messageColor ="bg-lime-500"
  }
  
  return (
    <p className={`p-2 my-2 w-full text-white uppercase font-bold text-center ${messageColor}`}>{children}</p>
  )
}

export default Alert