import { createTransport } from "nodemailer";
import { BRAND_COLORS } from "@/app/constants";
import { SendVerificationRequestParams } from "next-auth/providers";

export async function verificationRequest(
  params: SendVerificationRequestParams
) {
  const { identifier, url, provider, theme } = params;
  const { host } = new URL(url);
  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport = createTransport(provider.server);
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Activate your account`,
    text: text({ url, host }),
    html: html({ url, host, theme: BRAND_COLORS }),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}
/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function html(params: {
  url: string;
  host: string;
  theme: typeof BRAND_COLORS;
}) {
  const { url, host, theme } = params;

  const escapedHost = host.replace(/\./g, "&#8203;.");

  const color = {
    background: "#f9f9f9",
    text: theme.blue_gray,
    mainBackground: theme.ghost_white,
    buttonBackground: theme.royal_blue,
    buttonText: theme.ghost_white,
  };

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        <div>
          <h1 style="margin-top:0;color: ${color.text};font-size:22px;font-weight:bold;text-align:left">Welcome to Feedback Board,</h1>
          <p style="margin:0.4em 0 1.1875em;text-align:left;font-size:16px;line-height:1.625;color:${color.text};">Click link to activate your account</p>
          <p style="margin:0.4em 0 1.1875em;text-align:left;font-size:16px;line-height:1.625;"><a href="${url}" target="_blank" style="color:${color.buttonText};text-align:left;background-color:${color.buttonBackground};border-top:10px solid ${color.buttonBackground};border-right:18px solid ${color.buttonBackground};border-bottom:10px solid ${color.buttonBackground};border-left:18px solid ${color.buttonBackground};display:inline-block;text-decoration:none;border-radius:3px;box-sizing:border-box" target="_blank">Activate Account</a></p>
           <p style="margin:0.4em 0 1.1875em;text-align:left;font-size:16px;line-height:1.625;color:${color.text};">The link expires in 24 hours.</p>
        </div>
      </td>
    </tr>
  </table>
</body>
`;
}
function text({ url, host }: { url: string; host: string }) {
  return `Create your account\n`;
}
