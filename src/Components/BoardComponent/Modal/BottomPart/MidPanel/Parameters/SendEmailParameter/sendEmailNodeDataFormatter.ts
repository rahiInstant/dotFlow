export const sendEmailNodeDataFormatter = (
  sendEmailNodeData: any,
  nodeId: string
) => {
    // console.log(sendEmailNodeData.toEmail, 'from formatter')
  return {
    id: "sendEmail1",
    name: "Send Email",
    description: "Send an SMTP protocol email",
    type: "SendEmail",
    disabled: true,
    parameters: {
      credentials: {
        id: "d0esgqltcbthv6156tjg",
        name: "SMTP account",
        provider: "email",
        ctype: "smtp",
      },
      fromEmail: sendEmailNodeData?.fromEmail,
      toEmail: sendEmailNodeData?.toEmail,
      subject: sendEmailNodeData?.subject,
      emailFormat: sendEmailNodeData?.emailFormat,
      text: sendEmailNodeData?.emailFormat,
      options: {
        appendAttribution: sendEmailNodeData?.appendAttribution,
        attachments: sendEmailNodeData?.attachments,
        ccEmail: sendEmailNodeData?.ccEmail,
        bccEmail: sendEmailNodeData?.bccEmail,
        allowUnauthorizedCerts: true,
        replyTo: sendEmailNodeData?.replyTo,
      },
    },
    position: {
      x: -14960,
      y: -240,
    },
    inputs: [
      {
        id: "input",
        name: "Input",
        description: "SendEmail input port",
        type: "object",
      },
    ],
    outputs: [],
  };
};
