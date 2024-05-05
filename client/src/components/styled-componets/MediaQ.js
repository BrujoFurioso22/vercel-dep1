const size = {
  s1: "480px", // for mobile screen
  s2:"768px",
  s3: "1024px", // for tablets
  s4: "1440px", // for laptops
  s5: "1441px", // for desktop / monitors
};

export const device = {
  mobile: `(max-width: ${size.s1})`,
  mobile1: `(max-width: ${size.s2})`,
  tablet: `(max-width: ${size.s3})`,
  laptop: `(max-width: ${size.s4})`,
  desktop: `(min-width: ${size.s5})`,
};
