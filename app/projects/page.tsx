'use client'

import { useEffect } from 'react'
import Folder from "@/components/folder"

export default function ProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Folder />
}
