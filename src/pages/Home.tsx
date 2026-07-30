import { Hero } from '../components/sections/Hero'
import { Ecosystem } from '../components/sections/Ecosystem'
import { WhatWeBuild } from '../components/sections/WhatWeBuild'
import { Philosophy } from '../components/sections/Philosophy'
import { SelectedWork } from '../components/sections/SelectedWork'
import { About } from '../components/sections/About'
import { Closing } from '../components/sections/Closing'

export function Home() {
  return (
    <>
      <Hero />
      <Ecosystem />
      <WhatWeBuild />
      <Philosophy />
      <SelectedWork />
      <About />
      <Closing />
    </>
  )
}
