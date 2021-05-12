const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';



  if(Validator.isEmpty(data.title)){
    errors.title = "工作内容不能为空!";
  }

  if(Validator.isEmpty(data.company)){
    errors.company = "公司名不能为空!";
  }

  if(Validator.isEmpty(data.from)){
    errors.from = "时间不能为空!";
  }



  return {
    errors,
    isValid:isEmpty(errors)
  };
}