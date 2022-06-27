export const convertNumberToWord = (amount) => {
  //     var words = new Array();
  //     words[0] = '';
  //     words[1] = 'یک';
  //     words[2] = 'دو';
  //     words[3] = 'سه';
  //     words[4] = 'چهار';
  //     words[5] = 'پنج';
  //     words[6] = 'شش';
  //     words[7] = 'هفت';
  //     words[8] = 'هشت';
  //     words[9] = 'نه';
  //     words[10] = 'ده';
  //     words[11] = 'یازده';
  //     words[12] = 'دوازده';
  //     words[13] = 'سیزده';
  //     words[14] = 'چهارده';
  //     words[15] = 'پانزده';
  //     words[16] = 'شانزده';
  //     words[17] = 'هفده';
  //     words[18] = 'هجده';
  //     words[19] = 'نانزده';
  //     words[20] = 'بیست';
  //     words[30] = 'سی';
  //     words[40] = 'چهل';
  //     words[50] = 'پنجاه';
  //     words[60] = 'شصت';
  //     words[70] = 'هفتاد';
  //     words[80] = 'هشتاد';
  //     words[90] = 'نود';

  //     amount = amount.toString();
  //     var atemp = amount.split(".");
  //     var number = atemp[0].split(",").join("");
  //     var n_length = number.length;
  //     var words_string = "";

  //     if (n_length <= 9) {
  //         var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
  //         var received_n_array = new Array();
  //         for (var i = 0; i < n_length; i++) {
  //             received_n_array[i] = number.substr(i, 1);
  //         }
  //         for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
  //             n_array[i] = received_n_array[j];
  //         }
  //         for (var i = 0, j = 1; i < 9; i++, j++) {
  //             if (i == 0 || i == 2 || i == 4 || i == 7) {
  //                 if (n_array[i] == 1) {
  //                     n_array[j] = 10 + parseInt(n_array[j]);
  //                     n_array[i] = 0;
  //                 }
  //             }
  //         }
  //         let value = "";
  //         for (var i = 0; i < 9; i++) {
  //             if (i == 0 || i == 2 || i == 4 || i == 7) {
  //                 value = n_array[i] * 10;
  //             } else {
  //                 value = n_array[i];
  //             }
  //             if (value != 0) {
  //                 words_string += words[value] + " ";
  //             }
  //             if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
  //                 words_string += "Crores ";
  //             }
  //             if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
  //                 words_string += "Lakhs ";
  //             }
  //             if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
  //                 words_string += "هزار";
  //             }
  //             if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
  //                 words_string += "صد ";
  //             } else if (i == 6 && value != 0) {
  //                 words_string += "صد ";
  //             }
  //         }
  //         words_string = words_string.split("  ").join(" ");
  //     }

  //   return words_string;
  return "";
};
