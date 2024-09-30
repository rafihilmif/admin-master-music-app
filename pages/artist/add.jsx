import React from 'react'

export default function add() {
  return (
      <>
           <>
      <p className="text-gray-700 text-3xl mb-16 font-bold">Create new a Artist</p>

     <>
          <form
        // onSubmit={handleSubmit(onSubmit)}
        class="my-4 w-full border bg-white px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 gap-5 mb-16"
      >
        <div class="flex flex-col border-b py-4 sm:flex-row sm:items-start">
          <div class="mr-auto shrink-0 sm:py-3">
            <p class="font-bold text-2xl text-black">Account Details</p>
            <p class="text-sm text-gray-600">Add your account details</p>
          </div>
          <button
            // onClick={() => reset()}
            class="mr-2 hidden rounded-lg border-2 px-4 py-2 font-medium text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring sm:inline"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="hidden rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring sm:inline"
          >
            Save
          </button>
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Name</p>
          <input
            // {...register('name', { required: true })}
            placeholder="Name as artist"
            class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Email</p>
          <input
            // {...register('email', { required: true })}
            placeholder="your.email@domain.com"
          class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Username</p>
          <input
            // {...register('username', { required: true })}
            placeholder="Username"
           class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Password</p>
          <input
            // {...register('password', { required: true })}
            placeholder="••••••••"
            type="password"
           class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
          />
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Genre</p>
          <div class="relative w-full rounded-lg ">
            <select
            //   {...register('genre', { required: true })}
              autocomplete="album-name"
              class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1 text-black"
            >
              <option value="#">Please select genre...</option>
              {/* {dataGenre.map((data) => (
                <option value={data.name}>{data.name}</option>
              ))} */}
            </select>
          </div>
        </div>
        <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
          <p class="w-32 shrink-0 font-medium text-black">Formed</p>
          <input
            // {...register('formed', { required: true })}
            type="date"
            class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
          />
        </div>
        <div class="flex flex-col gap-4 py-4  lg:flex-row">
          <div class="w-32 shrink-0  sm:py-4">
            <p class="mb-auto font-medium">Avatar</p>
            <p class="text-sm text-gray-600">Change your avatar</p>
          </div>
          <div class="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center">
            <img src='/images/commonthumbnails/thumbnail1.png' className="h-16 w-16 rounded-full" />
            <p class="text-sm text-gray-600">
              Drop your desired image file here to start the upload
            </p>
            <input
            //   {...register('image', { required: true })}
              type="file"
              class="max-w-full rounded-lg px-2 font-medium text-blue-600 outline-none ring-blue-600 focus:ring-1"
            />
          </div>
        </div>
      </form>
      </>
    </>
      </>
  )
}