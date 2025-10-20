'use client'

import { definePlugin } from 'sanity'

const plugin = definePlugin({
  name: 'my-plugin',
})

export default function Home() {
  console.log(plugin)
  return (
    <pre>
      <code>{JSON.stringify(plugin(), null, 2)}</code>
    </pre>
  )
}
