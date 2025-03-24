export const getMapsUrl = (destination, origin = "") => {
  const baseUrl = "https://www.google.com/maps/dir/";
  const params = new URLSearchParams({
    api: "1",
    destination: destination,
    ...(origin && { origin: origin })
  });
  return `${baseUrl}?${params.toString()}`;
};