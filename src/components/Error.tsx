import { Button } from "antd";
import error from "../assets/computer.png";

const ErrorPage = () => {
  return (
    <div>
      <img src={error} alt="error" className="w-1/2 mx-auto" />
      <Button
        type="primary"
        className="block mx-auto mt-4"
        onClick={() => window.location.reload()}
      >
        Try Again
      </Button>
    </div>
  );
};
export default ErrorPage;
