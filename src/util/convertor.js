// @ts-check

/**@param {string} string*/
function persianNumberToEnglish(string) {
  string = String(string);
  return Number(
    string.replace(/[۰-۹]/g, (digit) =>
      '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit),
    ),
  );
}

/**@param {string} string*/
function arabicNumberToEnglish(string) {
  string = String(string);
  return Number(
    string.replace(/[٠-٩]/g, (digit) =>
      '٠١٢٣٤٥٦٧٨٩'.indexOf(digit),
    ),
  );
}

module.exports = {
  persianNumberToEnglish,
  arabicNumberToEnglish,
};
