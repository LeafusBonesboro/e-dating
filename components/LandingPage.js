"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import Image from "next/image";


export default function LandingPage() {
  return (
    <div className="w-full">
      {/* Hero Carousel */}
      <section className="relative w-full h-screen overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="w-full h-full"
        >
          {[
            {
              src: "/images/Brownies.png",
              title: (
                <>
                  Enjoy Free Shipping <br />
                  on All Orders
                </>
              ),
              desc: "Take advantage of our free shipping offer on all orders. Get your favorite desserts delivered to your doorstep without any extra cost.",
              button: "Order Now",
              href: "/brownies",
            },
            {
              src: "/images/Rice.webp",
              title: (
                <>
                  Curated Collections <br />
                  for Every Taste
                </>
              ),
              desc: "Browse our exclusive collections, including holiday-themed desserts and gourmet treats.",
              button: "View Collections",
              href: "/cupcakes",
            },
            {
              src: "/images/Gummies.png",
              title: (
                <>
                  Handcrafted Treats <br />
                  Made with Love
                </>
              ),
              desc: "From gourmet brownies to artisanal cookies, every bite is baked to perfection.",
              button: "Shop Now",
              href: "/gummies",
            },
          ].map((slide, idx) => (
            <SwiperSlide key={idx}>
  {({ isActive }) => (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className={`absolute inset-0 bg-center bg-cover transition-transform duration-[6000ms] ease-out ${
          isActive ? "scale-110" : "scale-100"
        }`}
        style={{ backgroundImage: `url(${slide.src})` }}
      />
      <div className="relative z-10 flex items-center h-full px-12 max-w-2xl">
        <div>
          <h1 className="text-4xl md:text-6xl text-white font-bold leading-tight">
            {slide.title}
          </h1>
          <p className="text-white mt-4">{slide.desc}</p>
          <Link
            href={slide.href}
            className="mt-6 inline-block px-6 py-3 bg-white text-black rounded-md font-semibold hover:bg-gray-200"
          >
            {slide.button}
          </Link>
        </div>
      </div>
    </div>
  )}
</SwiperSlide>


          ))}
        </Swiper>
      </section>

      {/* Categories */}
      <section className="bg-white py-16">
        <h2 className="text-2xl font-bold text-center mb-12">
          Explore Our Categories
        </h2>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop={true}
          className="max-w-6xl mx-auto"
        >
          {[
            { src: "/images/cupcakes.jpg", title: "Cupcakes", href: "/cupcakes" },
            { src: "/images/Crispy.jpg", title: "Crisps", href: "/crisps" },
            { src: "/images/Brownie1.jpg", title: "Brownies", href: "/brownies" },
            { src: "/images/gummies1.jpg", title: "Gummies", href: "/gummies" },
          ].map((cat, idx) => (
           <SwiperSlide key={idx}>
  <div className="relative h-[800px] rounded-lg overflow-hidden shadow-lg group">
    <Image
      src={cat.src}
      alt={cat.title}
      width={600}
      height={800}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-white">
      <h3 className="text-2xl font-bold">{cat.title}</h3>
      <Link
        href={cat.href}
        className="mt-4 bg-white text-black px-5 py-2 rounded shadow hover:bg-gray-100"
      >
        Shop Now
      </Link>
    </div>
  </div>
</SwiperSlide>

          ))}
        </Swiper>
      </section>

      {/* Holiday Delights */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Holiday Delights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                src: "/images/Brownie1.jpg",
                title: "Classic Fudge Brownie",
                price: "$3.38",
                old: "$4.50",
              },
              {
                src: "/images/Brownies.png",
                title: "Oatmeal Raisin Cookie",
                price: "$2.00",
                old: "$3.00",
              },
              {
                src: "/images/cupcakes.jpg",
                title: "Red Velvet Cupcake",
                price: "$4.75",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
  <Image
    src={item.src}
    alt={item.title}
    width={400}
    height={240}
    className="rounded-lg w-full h-60 object-cover"
  />
  <h3 className="mt-4 font-semibold">{item.title}</h3>
  {item.old && (
    <p className="line-through text-gray-400">{item.old}</p>
  )}
  <p className="text-orange-600">{item.price}</p>
</div>

            ))}
          </div>
        </div>
      </section>

      {/* Gourmet Treats */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Gourmet Treats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { src: "/images/seasonal.jpg", title: "Walnut Brownie", price: "$5.00" },
              { src: "/images/Brownies.png", title: "Classic Fudge Brownie", price: "$3.38" },
              { src: "/images/Crispy.jpg", title: "Peanut Butter Cookie", price: "$3.25" },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
  <Image
    src={item.src}
    alt={item.title}
    width={400}
    height={240}
    className="rounded-lg w-full h-60 object-cover"
  />
  <h3 className="mt-4 font-semibold">{item.title}</h3>
  <p className="text-orange-600">{item.price}</p>
</div>

            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Offers */}
      <section className="relative overflow-hidden py-32 text-white">
  {/* Background with zoom effect */}
  <div
    className="absolute inset-0 bg-center bg-cover animate-kenburns"
    style={{ backgroundImage: "url('/images/seasonal-banner.jpg')" }}
  ></div>

  {/* Overlay content */}
  <div className="relative max-w-2xl mx-auto text-center px-4">
    <h2 className="text-4xl md:text-5xl font-bold drop-shadow-md mb-4">
      Exclusive Seasonal Offers
    </h2>
    <p className="text-lg md:text-xl mb-6 drop-shadow-md">
      Indulge in our limited-time offers on gourmet cupcakes, artisanal
      cookies, and decadent brownies. Treat yourself today!
    </p>
    <button className="px-6 py-3 border-2 border-white text-white rounded-md font-semibold hover:bg-white hover:text-black transition">
      Shop Now for Deals
    </button>
  </div>
</section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>Holiday Collection</li>
              <li>Shop All</li>
              <li>Gourmet Treats</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>Cupcakes</li>
              <li>Crisp</li>
              <li>Brownies</li>
              <li>Seasonal Desserts</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Collections</h3>
            <ul className="space-y-2">
              <li>Seasonal Flavors</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Stay Updated</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 w-48 rounded-l-md border border-gray-300 focus:outline-none"
              />
              <button className="px-6 py-3 bg-orange-500 text-white rounded-r-md hover:bg-orange-600">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-400">
          © 2024 Delta Treats — All rights reserved.
        </div>
      </footer>
    </div>
  );
}

/* Ken Burns animation */
<style jsx global>{`
  @keyframes kenburns {
    0% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  .animate-kenburns {
    animation: kenburns 20s ease-in-out infinite alternate;
  }
`}</style>
