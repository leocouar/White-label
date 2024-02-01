
import React from 'react';
import PriceFormatter from '@/components/products/PriceFormat';

function Price({ currency, num, numSize }) {
  const formattedPrice = PriceFormatter(num);

  return (
    <>
      {currency}&nbsp;<span className={numSize}>{formattedPrice}</span>
    </>
  );
}

export default Price;

