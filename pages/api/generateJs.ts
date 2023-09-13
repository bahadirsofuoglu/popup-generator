import type { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const settings = req.body.fields;

    const jsCode = generateJSCodes(settings);

    const params = {
        Bucket: 'popupgenarator',
        Key: 'popupgenarator.js',
        Body: jsCode,
        ContentType: 'application/javascript',
    };

    try {
        const uploadResult = await s3.upload(params).promise();
        res.status(200).json({ success: true, url: uploadResult.Location });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

function generateJSCodes(settings: any) {
    console.log(settings);
    const jsCode = `
    document.addEventListener("DOMContentLoaded", function() {

        const settings = ${JSON.stringify(settings)};
        const overlay = document.createElement('div');
       
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgb(147 197 253)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '1000';
    
        const closeButton = document.createElement('div');
        closeButton.innerText = 'X';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.zIndex = '1001';
    
        const popupDiv = document.createElement('div');
        popupDiv.style.width = '50vw';
        popupDiv.style.borderRadius = '0.5rem';
        popupDiv.style.backgroundColor = 'rgb(255 255 255)';
        popupDiv.style.padding = '2rem';
        popupDiv.style.position= 'relative';
    
        closeButton.addEventListener('click', () => {
          document.body.removeChild(overlay);
        });

       

      const popupContent = \`
        <form id="pg-form" style="font-family:Inter">
          <div style="margin-bottom: 1rem;">
            <label style="line-height: 1.25rem;display: block; font-size: 0.875rem; font-weight: bold; color: rgb(0 0 0);" for="name">\${settings.name.label}</label>
            <input id="pg-name-input" style="line-height: 2rem;box-sizing: border-box; width: 100%; border-radius: 0.375rem; border: 1px solid; padding: 0 0.75rem; font-size: 0.875rem; color: rgb(0 0 0); box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);border-color: rgb(209 213 219);" id="name" type="text" placeholder="\${settings.name.placeholder}">
            <span style="display: none; font-size: 0.75rem; color: #FC8181;" id="name-error-message">\${settings.name.errorMessage}</span>
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="line-height: 1.25rem;display: block; font-size: 0.875rem; font-weight: bold; color: rgb(0 0 0);" for="email">\${settings.email.label}</label>
            <input id="pg-email-input" style="line-height: 2rem;box-sizing: border-box; width: 100%; border-radius: 0.375rem; border: 1px solid; padding: 0 0.75rem; font-size: 0.875rem; color: rgb(0 0 0); box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);border-color: rgb(209 213 219);" id="email" type="email" placeholder="\${settings.email.placeholder}">
            <span style="display: none; font-size: 0.75rem; color: #FC8181;" id="email-error-message">\${settings.email.errorMessage}</span>
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="line-height: 1.25rem;display: block; font-size: 0.875rem; font-weight: bold; color: rgb(0 0 0);" for="phone">\${settings.phoneNumber.label}</label>
            <input id="pg-phoneNumber-input" style="line-height: 2rem;box-sizing: border-box; width: 100%; border-radius: 0.375rem; border: 1px solid; padding: 0 0.75rem; font-size: 0.875rem; color: rgb(0 0 0); box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);border-color: rgb(209 213 219);" id="phone" type="text" placeholder="\${settings.phoneNumber.placeholder}">
            <span style="display: none; font-size: 0.75rem; color: #FC8181;" id="phoneNumber-error-message">\${settings.phoneNumber.errorMessage}</span>
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="line-height: 1.25rem;display: block; font-size: 0.875rem; font-weight: bold; color: rgb(0 0 0);" for="consent">\${settings.consent.label}</label>
            <input id="pg-consent-input" style="line-height: 2rem;box-sizing: border-box; width: 100%; border-radius: 0.375rem; border: 1px solid; padding: 0 0.75rem; font-size: 0.875rem; color: rgb(0 0 0); box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);border-color: rgb(209 213 219);" id="consent" type="text" placeholder="\${settings.consent.placeholder}">
            <span style="display: none; font-size: 0.75rem; color: #FC8181;" id="consent-error-message">\${settings.consent.errorMessage}</span>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <button style="border-color: rgb(59 130 246); border-radius: 0.375rem; background: rgb(59 130 246); padding: 0.5rem 1rem; font-weight: 700; color: rgb(255 255 255); cursor: pointer;font-family: inherit; font-size: 100%; margin:0;    border-width: 0;
            border-style: solid;" type="submit">Submit</button>
          </div>
        </form>
      \`;
  
   

      popupDiv.innerHTML = popupContent;
      popupDiv.appendChild(closeButton);
      overlay.appendChild(popupDiv);
      document.body.appendChild(overlay);

      const form = document.getElementById("pg-form");
      form.addEventListener("submit", function(event) {
          event.preventDefault(); 
        
          const nameValue = document.getElementById("pg-name-input").value;
          const emailValue = document.getElementById("pg-email-input").value;
          const phoneNumberValue = document.getElementById("pg-phoneNumber-input").value;
          const consentValue = document.getElementById("pg-consent-input").value;

          let isValid = true;
          const formData = new FormData(form);
        
          ["name", "email", "phoneNumber", "consent"].forEach((fieldName) => {
            const value = document.getElementById(\`pg-\${fieldName}-input\`).value;
            const errorMsgElement = document.querySelector(\`#\${fieldName}-error-message\`);
            if (!value) {
              isValid = false;
              errorMsgElement.style.display = "inline";  
              errorMsgElement.textContent = settings[fieldName].errorMessage;
            } else {
              errorMsgElement.style.display = "none";  
              errorMsgElement.textContent = "";
            }
          });
     
        if (isValid) {
            const payload = JSON.stringify({
              name: nameValue,
              email: emailValue,
              phoneNumber: phoneNumberValue,
              consent: consentValue === 'true' 
            });

            fetch("/api/submitForm", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: payload,
            }).then((response) => {
              if (response.ok) {
                console.log("Form submitted");
              } else {
                console.log("Failed to submit form");
              }
            }).catch((error) => {
              console.log("There was an error", error);
            });
          }
        });
    });
    `;
    return jsCode;
}
