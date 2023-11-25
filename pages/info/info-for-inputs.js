const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const getUniqeEmail = function () {
  return `${new Date().getTime()}@test.test`;
};

const getRandomNameFromArr = function () {
  names = [
    "Тестовое имя один",
    "Тестовое имя два",
    "Тестовое имя три",
    "Тестовое имя четыре",
    "Тестовое имя пять",
  ];

  return `${names[getRandomNumber(0, 4)]}`;
};

const getRandomFilePathFromArr = function () {
  filePathes = [
    "D:/Screenshots/copy/Screenshot_1.png",
    "D:/Screenshots/copy/Screenshot_2.png",
    "D:/Screenshots/copy/Screenshot_3.png",
    "D:/Screenshots/copy/Screenshot_4.png",
    "D:/Screenshots/copy/Screenshot_5.png",
  ];

  return `${filePathes[getRandomNumber(0, 4)]}`;
};

const infoForInputs = {
  name: getRandomNameFromArr(),
  email: getUniqeEmail(),
  filePath: getRandomFilePathFromArr(),
  city: "Новорепное",
  phone: getRandomNumber(8000000000, 9999999999),
  area: getRandomNumber(100, 500).toString(),
  distance: getRandomNumber(1, 15).toString(),
  numberOfOrder: getRandomNumber(100000, 999999).toString(),
  message: "Это тестовое письмо и на него не надо отвечать. Спасибо.",
};

module.exports = { infoForInputs };
