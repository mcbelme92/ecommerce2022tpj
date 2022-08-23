import useWindowSize from "../hooks/UseWindowSize";
import {
  breakpointUpSm,
  breakpointUpMd,
  breakpointUpLg,
  breakpointUpXl,
} from "../utils/breakpoints";

export default function ResponsiveRender() {
  const { width } = useWindowSize();

  //1200
  if (width >= breakpointUpXl) {
    return 1;
  }
  //   } else if (width > breakpointUpLg) {
  //     return 4;
  //   } else if (width > breakpointUpMd) {
  //     return 3;
  //   } else if (width >= breakpointUpSm) {
  //     return 2;
  //   } else {
  //     return 1;
  //   }
}
