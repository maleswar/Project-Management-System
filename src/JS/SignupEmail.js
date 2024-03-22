import emailjs from "emailjs-com";

const SignupEmail = (emailData) => {
  const data = {
    email: emailData.email,
    fname: emailData.fname,
    lname: emailData.lname,
    password: emailData.password,
    uid: emailData.uid,
    // message: emailData.message,
  };
  emailjs
    .send("service_5mzbjm8", "template_r7q4n9n", data, "3haCka_H9w88h8U5t")
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error.message);
    });
};
export default SignupEmail;
