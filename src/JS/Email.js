import emailjs from "emailjs-com";

const sendEmail = (emailData) => {

  const data = {
    email: emailData.email,
     name : emailData.name,
    // message: emailData.message,
  };    
  emailjs
    .send("service_5mzbjm8", "template_j7s5efz", data, "3haCka_H9w88h8U5t")
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error.message);
    });
};
 export default sendEmail;