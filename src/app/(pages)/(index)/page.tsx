'use client'
import { Input } from '@/chadcn/components/ui/input';
import { useEffect, useState } from 'react';

let timer: NodeJS.Timeout

export default function MainPage() {
  const [inputValue, setInputValue] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')

  useEffect(() => {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => setDebouncedValue(inputValue), 500)

  }, [inputValue])

  useEffect(() => {
    doRequest()
  }, [debouncedValue])

  const doRequest = async () => {
    await fetch('')
  }

  return (
    <section className={`flex h-full w-full flex-col `}>
      <Input className='mt-5' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValue(value)
      }}/>
    </section>
  )
}
