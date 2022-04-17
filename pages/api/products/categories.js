import nc from 'next-connect';

const handler = nc();

handler.get(async (req, res) => {
  const categories = ['Speciality', 'Traditional'];
  res.send(categories);
});

export default handler;
