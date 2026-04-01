'use client';

import React from 'react';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold">Product Detail</h1>
      <p className="mt-4 text-gray-600">Viewing details for product ID: <span className="font-mono text-blue-600">{id}</span></p>
      <div className="mt-8 p-4 border border-dashed border-gray-300 rounded text-center">
        Product details coming soon...
      </div>
    </div>
  );
}