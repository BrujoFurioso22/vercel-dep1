const size = {
  s1: "480px", // for mobile screen
  s2: "1024px", // for tablets
  s3: "1440px", // for laptops
  s4: "1441px", // for desktop / monitors
};

export const device = {
  mobile: `(max-width: ${size.s1})`,
  tablet: `(max-width: ${size.s2})`,
  laptop: `(max-width: ${size.s3})`,
  desktop: `(min-width: ${size.s4})`,
};
