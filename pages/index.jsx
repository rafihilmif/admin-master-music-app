import React from 'react'

export default function index() {
  return (
     <>
      <p className="text-gray-700 text-3xl mb-16 font-bold">Dashboard</p>

      <div className="grid lg:grid-cols-3 gap-5 mb-16">
        <div className="rounded bg-blue-400 h-40 shadow-sm">1</div>
        <div className="rounded bg-yellow-400 h-40 shadow-sm">2</div>
        <div className="rounded bg-red-400 h-40 shadow-sm">3</div>
      </div>
      <div className="grid col-1 bg-emerald-400 h-96 shadow-sm">4</div>
    </>
  )
}
