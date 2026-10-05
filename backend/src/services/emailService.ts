import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface CoworkingQuoteData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  spaceType: string;
  capacity: string;
  period: string;
  message?: string;
}

export const sendCoworkingQuoteEmail = async (data: CoworkingQuoteData) => {
  const spaceTypeLabels: Record<string, string> = {
    posto: 'Posto de Trabalho',
    sala: 'Sala de Reunião',
    auditorio: 'Auditório',
    podcast: 'Estúdio Podcast',
    endereco: 'Endereço Fiscal/Comercial',
    plano: 'Plano Mensal Completo',
  };

  const capacityLabels: Record<string, string> = {
    '1': '1 pessoa',
    '2-5': '2 a 5 pessoas',
    '6-10': '6 a 10 pessoas',
    '10+': 'Mais de 10 pessoas',
  };

  const periodLabels: Record<string, string> = {
    hora: 'Por hora',
    diaria: 'Diária',
    semanal: 'Semanal',
    mensal: 'Mensal',
    anual: 'Anual',
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 30px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.1); }
        .header { background: #0a0a0a; padding: 32px; text-align: center; }
        .header h1 { color: #378ADD; font-size: 22px; margin: 0 0 4px; }
        .header p { color: #aaa; font-size: 13px; margin: 0; }
        .badge { display: inline-block; background: #378ADD; color: #fff; font-size: 11px; font-weight: bold; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
        .body { padding: 32px; }
        .section-title { font-size: 11px; color: #378ADD; text-transform: uppercase; letter-spacing: 2px; font-weight: bold; margin-bottom: 12px; border-bottom: 1px solid #eee; padding-bottom: 8px; }
        .field { margin-bottom: 14px; }
        .field label { font-size: 12px; color: #888; display: block; margin-bottom: 2px; }
        .field span { font-size: 15px; color: #1a1a1a; font-weight: 500; }
        .highlight-box { background: #f0f7ff; border-left: 4px solid #378ADD; padding: 16px; border-radius: 0 8px 8px 0; margin: 20px 0; }
        .footer { background: #f9f9f9; padding: 20px 32px; font-size: 12px; color: #aaa; text-align: center; border-top: 1px solid #eee; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="badge">Nova Cotação</div>
          <h1>Vila Tech Hub — Coworking</h1>
          <p>Uma nova solicitação de cotação foi recebida pelo site</p>
        </div>
        <div class="body">
          <p class="section-title">Dados de Contato</p>
          <div class="field">
            <label>Nome</label>
            <span>${data.name}</span>
          </div>
          <div class="field">
            <label>Email</label>
            <span><a href="mailto:${data.email}" style="color:#378ADD">${data.email}</a></span>
          </div>
          <div class="field">
            <label>Telefone / WhatsApp</label>
            <span><a href="https://wa.me/55${data.phone.replace(/\D/g, '')}" style="color:#378ADD">${data.phone}</a></span>
          </div>
          ${data.company ? `<div class="field"><label>Empresa</label><span>${data.company}</span></div>` : ''}

          <p class="section-title" style="margin-top: 28px">Interesse</p>
          <div class="highlight-box">
            <div class="field">
              <label>Tipo de Espaço</label>
              <span>${spaceTypeLabels[data.spaceType] || data.spaceType}</span>
            </div>
            <div class="field">
              <label>Capacidade</label>
              <span>${capacityLabels[data.capacity] || data.capacity}</span>
            </div>
            <div class="field" style="margin-bottom:0">
              <label>Período</label>
              <span>${periodLabels[data.period] || data.period}</span>
            </div>
          </div>

          ${data.message ? `
          <p class="section-title">Mensagem</p>
          <p style="color:#444; font-size:14px; line-height:1.6;">${data.message}</p>
          ` : ''}
        </div>
        <div class="footer">
          Enviado automaticamente pelo site vilatechub.com.br &nbsp;|&nbsp; Vila Tech Hub — Coworking em Itu
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Vila Tech Hub" <${process.env.SMTP_USER}>`,
    to: 'atendimento@vilatechub.com.br',
    replyTo: data.email,
    subject: `[Cotação Coworking] ${data.name} — ${spaceTypeLabels[data.spaceType] || data.spaceType}`,
    html: htmlContent,
  });
};
