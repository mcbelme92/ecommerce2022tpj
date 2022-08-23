import React, { useState } from "react";
import { Image, Modal } from "semantic-ui-react";
import Slider from "react-slick";
import { map } from "lodash";

export default function CarouselScreen(props) {
  const { game, name } = props;

  const screenshots = game.attributes.screenshots.data;

  const settings = {
    className: "carousel-screenshots",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    SwipeToSlider: true,
  };

  return (
    <div>
      <Slider {...settings}>
        {map(screenshots, (screenshot) => (
          <OpenPrev
            url={screenshot.attributes.url}
            alt={screenshot.attributes.caption}
            key={screenshot.id}
            llave={screenshot.id}
          />
        ))}
      </Slider>
    </div>
  );
}

function OpenPrev(props) {
  const { url, alt, llave } = props;
  const [showModal, setShowModal] = useState(false);
  const [urlImage, setUrlImage] = useState(null);

  const openModal = (url) => {
    setUrlImage(url);
    setShowModal(true);
  };
  const settings2 = {
    className: "carousel-prev",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    SwipeToSlider: true,
  };
  return (
    <>
      <Image src={url} alt={alt} onClick={() => openModal(url)} />
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Slider {...settings2}>
          <Image src={urlImage} alt={alt} key={llave} />
        </Slider>
      </Modal>
    </>
  );
}
