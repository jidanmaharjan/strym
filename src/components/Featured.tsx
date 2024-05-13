import { Carousel } from "antd";

const Featured = () => {
  const contentStyle: React.CSSProperties = {
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <Carousel autoplay className="mb-4 h-48">
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
};
export default Featured;
