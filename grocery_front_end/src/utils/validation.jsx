export const validation = {
    isEmailAddress: function (str) {
        var pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(str);  // returns a boolean
    },
    isNotEmpty: function (str) {
        var pattern = /\S+/;
        return pattern.test(str);  // returns a boolean
    },
    isNumber: function (str) {
        var pattern = /^\d+\.?\d*$/;
        return pattern.test(str);  // returns a boolean
    },
    isSame: function (str1, str2) {
        return str1 === str2;
    },
    isPercent: function (str) {
        const num = Number(str);
        return this.isNumber(str) && num >= 0 && num <= 100;
    },
    isBoolean: function (boolean){
        return typeof boolean == "boolean";
    }
};   