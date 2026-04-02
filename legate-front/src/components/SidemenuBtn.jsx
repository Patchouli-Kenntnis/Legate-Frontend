export default function SidemenuBtn({name}) {
    return (
            <li>
              <a href="#" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
                {name}
              </a>
            </li>)
}