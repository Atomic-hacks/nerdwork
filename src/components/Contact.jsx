import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen md:scroll-px-10">
      <div className="relative mx-auto max-w-7xl rounded-xl  bg-blue-75 py-24 text-blue-50">
        <div className="absolute -right-10 -top-28 w-60 sm:top-1/2 md:left-auto md:right-0 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/comicon7.png"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 text-[16px] uppercase text-neutral-600">
            Join nerdwork
          </p>

          <AnimatedTitle
            title="epic  c<b>o</b>mic cons <br /> and  <br /> i<b>r</b>l mee<b>t</b>ups."
            className=" !md:text-[6.2rem] w-full text-5xl !font-black !leading-[.9]"
          />

          <Button
            title="Join us"
            containerClass="mt-10 cursor-pointer !bg-yellow-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
