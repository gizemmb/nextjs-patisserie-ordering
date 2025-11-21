import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import Title from "../components/ui/Title";

const slides = [
  {
    title: "Delicious Cakes & Pastries",
    text: "Indulge in our wide variety of freshly baked cakes, pastries, and desserts made with love. From classic chocolate cakes to seasonal fruit tarts, every bite is a sweet delight that will make your day special.",
  },
  {
    title: "Artisan Breads Daily",
    text: "Our bakery crafts artisan breads every day using the finest ingredients. Soft, crusty, and full of flavor, our breads are perfect for breakfast, lunch, or any time you crave something freshly baked.",
  },
  {
    title: "Custom Cakes for Every Occasion",
    text: "Celebrate birthdays, weddings, or special events with our custom-designed cakes. We can create beautiful cakes that look as amazing as they taste, tailored to your style and theme.",
  },
  {
    title: "Pastry Delights for Coffee Lovers",
    text: "Pair your favorite coffee with our delicious pastries. From buttery croissants to delicate éclairs, our selection is perfect for a morning treat or an afternoon indulgence.",
  },
];
const NextArrow = ({ onClick }) => (
  <button
    className="btn-primary absolute right-5 top-1/2 -translate-y-1/2 z-10 transition"
    onClick={onClick}
  >
    →
  </button>
);
const PrevArrow = ({ onClick }) => (
  <button
    className="btn-primary absolute left-5 top-1/2 -translate-y-1/2 z-10 transition"
    onClick={onClick}
  >
    ←
  </button>
);
const Carousel = () => {
  var settings = {
    accessibility: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className=" w-full relative -mt-[88px]">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="relative w-full h-full">
          <Image
            src="/images/hero-bg.jpg"
            alt="Hero"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div className="text-primary-text z-10 mt-[150px] sm:mt-[250px] min-h-[500px] flex flex-col items-start gap-y-10 px-20 sm:px-30 ">
              <Title addClass="text-4xl sm:text-6xl">{slide.title}</Title>
              <p className="sm:text-md text-sm sm:w-2/5 w-full">{slide.text}</p>
              <Link href="/menu">
                <button className="btn-primary">Order Now</button>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
