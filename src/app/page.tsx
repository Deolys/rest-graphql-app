import Link from 'next/link'

export default function Home() {
  return (
    <main>
      Welcome page
      <ul>
        <li>
          <Link href="/login">Login page</Link>
        </li>
        <li>
          <Link href="/signup">Registration page</Link>
        </li>
        <li>
          <Link href="/main">Main</Link>
        </li>
      </ul>
    </main>
  )
}
