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
    console.log('req.body', req.body);

    const settings = req.body.fields;

    console.log('settings', settings);
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
        popupDiv.style.width = '100%';
        popupDiv.style.maxWidth = '400px';
        popupDiv.style.borderRadius = '0.5rem';
        popupDiv.style.backgroundColor = 'white';
        popupDiv.style.padding = '2rem';
        popupDiv.style.position = 'relative';
    
        closeButton.addEventListener('click', () => {
          document.body.removeChild(overlay);
        });

      const popupContent = \`
        <form>
          <div style="margin-bottom: 1rem;">
            <label style="margin-bottom: 0.5rem; display: block; font-size: 0.875rem; font-weight: bold; color: #4A5568;" for="name">\${settings.Name.label}</label>
            <input required style="width: 100%; border-radius: 0.375rem; border: 1px solid; padding: 0.5rem 0.75rem; font-size: 0.875rem; color: #4A5568; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);" id="name" type="text" placeholder="\${settings.Name.placeholder}">
            <span style="font-size: 0.75rem; color: #FC8181;">\${settings.Name.errorMessage}</span>
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="margin-bottom: 0.5rem; display: block; font-size: 0.875rem; font-weight: bold; color: #4A5568;" for="email">\${settings.Email.label}</label>
            <input required style="width: 100%; border-radius: 0.375rem; border: 1px solid; padding: 0.5rem 0.75rem; font-size: 0.875rem; color: #4A5568; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);" id="email" type="email" placeholder="\${settings.Email.placeholder}">
            <span style="font-size: 0.75rem; color: #FC8181;">\${settings.Email.errorMessage}</span>
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="margin-bottom: 0.5rem; display: block; font-size: 0.875rem; font-weight: bold; color: #4A5568;" for="phone">\${settings.PhoneNumber.label}</label>
            <input required style="width: 100%; border-radius: 0.375rem; border: 1px solid; padding: 0.5rem 0.75rem; font-size: 0.875rem; color: #4A5568; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);" id="phone" type="text" placeholder="\${settings.PhoneNumber.placeholder}">
            <span style="font-size: 0.75rem; color: #FC8181;">\${settings.PhoneNumber.errorMessage}</span>
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="margin-bottom: 0.5rem; display: block; font-size: 0.875rem; font-weight: bold; color: #4A5568;" for="consent">\${settings.Consent.label}</label>
            <input required style="width: 100%; border-radius: 0.375rem; border: 1px solid; padding: 0.5rem 0.75rem; font-size: 0.875rem; color: #4A5568; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);" id="consent" type="text" placeholder="\${settings.Consent.placeholder}">
            <span style="font-size: 0.75rem; color: #FC8181;">\${settings.Consent.errorMessage}</span>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <button style="border-radius: 0.375rem; background-color: #4299E1; padding: 0.5rem 1rem; font-weight: bold; color: white; cursor: pointer;" type="submit">Submit</button>
          </div>
        </form>
      \`;
  
      popupDiv.innerHTML = popupContent;
      popupDiv.appendChild(closeButton);
      overlay.appendChild(popupDiv);
      document.body.appendChild(overlay);
    });
    `;
    return jsCode;
}
