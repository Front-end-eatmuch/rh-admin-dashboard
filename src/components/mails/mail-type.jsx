const acceptedProfile = (data) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submission Accepted</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="width: 600px; margin: auto; background-color: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="text-align: center; padding-bottom: 20px;">
                <img src=${data?.logo} alt="panichef" width="150">
            </td>
        </tr>
        <tr>
            <td style="text-align: left;">
                <h2 style="color: #333; margin-bottom: 20px;">Submission Accepted</h2>
                <p style="color: #666; font-size: 16px; line-height: 1.6;">Dear ${data?.fullname},

                    We are glad to inform you that your recent submission has been accepted,

                    If you have any questions or need further clarification, please feel free to contact us on www.panichefs.com.

                    Thank you for your effort.

                    Best regards,

                    Panichef
                </p>
            </td>
        </tr>
    </table>

</body>
</html>
`;

const rejectedProfile = (data) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submission Rejected</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">

    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="width: 600px; margin: auto; background-color: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="text-align: center; padding-bottom: 20px;">
                <img src=${data?.logo} alt="panichef" width="150">
            </td>
        </tr>
        <tr>
            <td style="text-align: left;">
                <h2 style="color: #333; margin-bottom: 20px;">Submission Rejected</h2>
                <p style="color: #666; font-size: 16px; line-height: 1.6;">Dear ${data?.fullname},

                    We regret to inform you that your recent submission has been rejected for the following reason:

                    ${data?.reason}

                    If you have any questions or need further clarification, please feel free to contact us at www.panichefs.com.

                    Thank you for your understanding.

                    Best regards,

                    Panichef
                </p>
            </td>
        </tr>
    </table>

</body>
</html>
`;

export { acceptedProfile, rejectedProfile };
