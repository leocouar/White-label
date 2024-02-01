const PriceFormatter = (price) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

    if (typeof numericPrice !== 'number' || isNaN(numericPrice)) {
        throw new Error('Invalid input. Please provide a valid number.');
    }

    const formattedPrice = numericPrice.toLocaleString('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    
    const [intPrice, cents] = formattedPrice.split(',');
    
    return (
        <span>
            {intPrice}<sup>{cents}</sup>
        </span>
    );
}

export default PriceFormatter;
