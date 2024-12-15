const catchAsync = require('../../utils/catchAsync');

const indexPage = catchAsync(async (req, res) => {
  try {
    res.render("pages/chat")
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = { indexPage };
