import { useState, useEffect, Fragment, forwardRef } from "react";
import { useRouter } from "next/router";
import {Home, Person, Receipt, Album, Category, Collections, Group,Logout, MusicNote, NewReleases, Paid, Payment, PersonAdd, ReceiptLong, Stars, Summarize} from '@mui/icons-material';

const SideBar = forwardRef(({ showNav }, ref) => {
  const router = useRouter();

  return (
    <div ref={ref} className="fixed w-60 h-full bg-white shadow-sm overflow-y-auto">
      <div className="flex justify-center mt-6 mb-6">
        <picture>
          <img
            className="w-32 h-auto"
           src="/image/admin.png"
            alt="company logo"
          />
        </picture>
      </div>

      <div className="flex flex-col">
        <a href="/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <Home className="h-5 w-5" />
            </div>
            <div>
              <p>Dashboard</p>
            </div>
          </div>
        </a>
        <a href="/reported">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/reported"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <Summarize className="h-5 w-5" />
            </div>
            <div>
              <p>Reported</p>
            </div>
          </div>
        </a>
              <a href="/artist/add">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/artist/add"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <PersonAdd className="h-5 w-5" />
            </div>
            <div>
              <p>Create a new Artist</p>
            </div>
          </div>
              </a>
              <a href="/artist">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/artist"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <Group className="h-5 w-5" />
            </div>
            <div>
              <p>Data a Artist</p>
            </div>
          </div>
              </a>
              <a href="/artist/transaction">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/artist/transaction"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <ReceiptLong className="h-5 w-5" />
            </div>
            <div>
              <p>Transaction</p>
            </div>
          </div>
              </a>
              <a href="/artist/genre">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/artist/genre"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <Stars className="h-5 w-5" />
            </div>
            <div>
              <p>Genre</p>
            </div>
          </div>
              </a>
              <a href="/fans/add">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/fans/add"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <PersonAdd className="h-5 w-5" />
            </div>
            <div>
              <p>Create a new Fans</p>
            </div>
          </div>
              </a>
              <a href="/fans">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/fans"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <Group className="h-5 w-5" />
            </div>
            <div>
              <p>Data a Fans</p>
            </div>
          </div>
              </a>
              <a href="/fans/order">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/fans/order"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <Payment className="h-5 w-5" />
            </div>
            <div>
              <p>Order</p>
            </div>
          </div>
              </a>
              <a href="/fans/subscribe">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/fans/subscribe"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <Paid className="h-5 w-5" />
            </div>
            <div>
              <p>Subscribe</p>
            </div>
          </div>
              </a>
              <a href="/song/add">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/song/add"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <MusicNote className="h-5 w-5" />
            </div>
            <div>
              <p>Add new Song</p>
            </div>
          </div>
              </a>
              <a href="/song">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/song"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <Album className="h-5 w-5" />
            </div>
            <div>
              <p>Collection of Song</p>
            </div>
          </div>
              </a>
              <a href="/merchandise/add">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/merchandise/add"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <NewReleases className="h-5 w-5" />
            </div>
            <div>
              <p>Add new Merch</p>
            </div>
          </div>
              </a>
              <a href="/merchandise">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/merchandise"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <Collections className="h-5 w-5" />
            </div>
            <div>
              <p>Collection of Merch</p>
            </div>
          </div>
          
              </a>
              <a href="/merchandise/categories">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/merchandise/categories"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <Category className="h-5 w-5" />
            </div>
            <div>
              <p>Categories</p>
            </div>
          </div>
          
        </a>
          </div>
          
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
