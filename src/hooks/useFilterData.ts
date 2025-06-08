import { useState, useMemo } from "react";

const useFilterData = <T extends unknown>(
  filter: string,
  data: T[],
  keysExtractor: (item: T) => string
) => {
  const [isReversed, setIsReversed] = useState(false);

  const toggleReverse = () => {
    setIsReversed((prev) => !prev);
  };

  const filteredData = useMemo(() => {
    if (!data || !(Array.isArray(data))) return [];
    const sortedData = data.sort((a, b) => {
      const priceA = parseFloat(keysExtractor(a));
      const priceB = parseFloat(keysExtractor(b));
      return priceA - priceB;
    });
    let result = !filter
      ? sortedData
      : sortedData.filter((p) =>
          keysExtractor(p).toLowerCase().includes(filter.toLowerCase())
        );
    return isReversed ? [...sortedData].reverse() : result;
  }, [filter, data, keysExtractor, isReversed]);

  return { filteredData, toggleReverse };
};

export default useFilterData;