const dateFormatter = (date, lang) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString(
    lang === 'en' ? 'en-Us' : 'id-ID',
    options
  );
};

export { dateFormatter };
