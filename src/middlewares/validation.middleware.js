import { body, validationResult } from "express-validator";

// const validateRequest = (req, res, next) => {
//   const { name, desc, price, image } = req.body;
//   let errors = [];
//   if (!name || name.trim() == "") {
//     errors.push("Name cannot be empty.");
//   }
//   if (!price || parseFloat(price) < 1) {
//     errors.push("Price must be a positive value.");
//   }
//   if (!desc || desc.trim() == "") {
//     errors.push("Description cannot be empty.");
//   }
//   try {
//     const validURL = new URL(image);
//   } catch (err) {
//     errors.push("Please enter a valid image URL.");
//   }
//   if (errors.length > 0) {
//     return res.render("new-product", { errorMsg: errors[0] });
//   }
//   next();
// };

const validateFormData = async (req, res) => {
  // 1. Setup rules for validation
  const rules = [
    body("name").notEmpty().withMessage("Name cannot be empty."),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive value."),
    body("desc").notEmpty().withMessage("Description cannot be empty."),
    body("image").isURL().withMessage("Please enter a valid image URL."),
  ];

  // 2. run those rules.
  // Since running a rule can be async operation so we are running a rule using promises
  await Promise.all(rules.map((rule) => rule.run(req)));

  // 3. check if there are any errors after running the rules.
  // validationResult extracts all the errors in a express request
  let errors = validationResult(req); // returns an object
  console.log("errors: ", errors.array());

  // 4. if there are errors then return those errors.
  if (!errors.isEmpty()) {
    return res.render("new-product", { errorMsg: errors.array()[0].msg });
  }
  next();
};

export default validateFormData;
