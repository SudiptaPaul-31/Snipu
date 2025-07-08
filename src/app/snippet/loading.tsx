import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <span className="flex flex-col items-center justify-center mt-16">
      <Loader2 className="size-8 animate-spin text-primary" color="#a855f7"/>
    </span>
  );
}
