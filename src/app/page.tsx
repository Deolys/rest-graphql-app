import Link from 'next/link'

export default function Home() {
  return (
    <main>
      Main Page
      <ul>
        <li>
          <Link href="/login">Login page</Link>
        </li>
        <li>
          <Link href="/signup">Registration page</Link>
        </li>
      </ul>
    </main>
  )
}
