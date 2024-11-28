import { Link } from "react-router-dom"


const Tag = ({ text }) => {
  return (
    <Link
      href={`/tags/${text}`}
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag