interface Props {
  title: string
  boldTitle: string
  desc: string
  boldDesc: string
}

const TitleSection = ({boldDesc, boldTitle, desc, title}: Props) => {
  return (
    <section className='my-10 leading-6'>
      <h1 className='text-center text-xl md:text-2xl lg:text-3xl font-black'>{title}<span className='text-blue-600'>{boldTitle}</span></h1>
      <p className='text-center'>{desc}<span className='text-blue-600 font-bold'>{boldDesc}</span></p>
    </section>
  )
}

export default TitleSection