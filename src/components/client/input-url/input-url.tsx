'use client'
import { Input } from 'antd'
import { useURL } from '@/hooks/useURL'
import { usePathname } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'

export function InputUrl() {
  const pathname = usePathname()
  const [url, setUrl] = useURL()
  const [input, setInput] = useState(url)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value)
  const handleBlur = () => setUrl(input)
  useEffect(() => setInput(url), [pathname, url])

  return (
    <Input
      value={input}
      onBlur={handleBlur}
      onChange={handleChange}
      placeholder="Enter URL..."
    ></Input>
  )
}
