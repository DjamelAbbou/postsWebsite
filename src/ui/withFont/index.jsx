import { Poppins } from "@next/font/google";

const font = Poppins({
  variable: "--main-font",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function WithFont(Component) {
  return function WrapperFunction({ children, ...rest }) {
    return (
      <Component {...rest}>
        <div className={`${font.variable}`}>{children}</div>
      </Component>
    );
  };
}
