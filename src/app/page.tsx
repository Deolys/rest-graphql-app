import { pageRoutes } from '@/constants/page-routes'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      Welcome page
      <ul>
        <li>
          <Link href={pageRoutes.SIGN_IN}>Login page</Link>
        </li>
        <li>
          <Link href={pageRoutes.SIGN_UP}>Registration page</Link>
        </li>
        <li>
          <Link href={pageRoutes.MAIN}>Main</Link>
        </li>
      </ul>
    </>
  )
}
