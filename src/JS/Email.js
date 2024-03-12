import emailjs from "emailjs-com";

export const sendEmail = (emailData) => {

  const data = {
    to_name: emailData.to_name,
    to_email: emailData.to_email,
  };
  emailjs
    .send(your_service_id, templateId, data, userId)
    .then((response) => {
    })
    .catch((error) => {
      console.error(error.message);
    });
};