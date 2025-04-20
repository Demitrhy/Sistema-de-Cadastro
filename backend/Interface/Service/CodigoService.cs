using System;
using System.Net.Mail;
using LOG_RT_DISTRIBUICAO_CORE.Dto;
using LOG_RT_DISTRIBUICAO_CORE.Interface.Repositorio.Interface;
using MailKit.Net.Smtp;
using MimeKit;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace LOG_RT_DISTRIBUICAO_CORE.Interface.Service
{
    public class CodigoService : ICodigoService
    {
        private static Dictionary<string, string> codigosVerificacao = new Dictionary<string, string>();
        private readonly IUserRepository _user;

        public CodigoService(IUserRepository user)
        {
            _user = user;
         
        }
        public void EnviarCodigoEmail(string email, string codigo)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("<Gustavo/>", "gustavo_cordeiro27@outlook.com"));
            message.To.Add(new MailboxAddress("", email));
            message.Subject = "Código de Verificação";

            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = $@"
       
              <!DOCTYPE html>
              <html lang=""pt-BR"">
              <head>
                  <meta charset=""UTF-8"">
                  <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
                  <title>Código de Verificação</title>
                  <style>
                      body {{
                          font-family: Arial, sans-serif;
                          background-color: #f4f4f4;
                          text-align: center; 
                          margin: 0;
                          padding: 20px; 
                      }}
                      .container {{
                          background-color: #fff;
                          border-radius: 8px;
                          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                          padding: 30px;
                          width: 400px;
                          margin: 20px auto; 
                          text-align: center;
                          border: 1px solid #ccc;
                      }}
                      .header {{
                          color: #3b82f6; /* Cor azul */
                          font-size: 1.5em;
                          margin-bottom: 20px;
                      }}
                      .developer {{
                          color: #777;
                          font-size: 0.8em;
                          margin-bottom: 10px;
                      }}
                      .message {{
                          color: #555;
                          margin-bottom: 20px;
                      }}
                      .code-container {{
                          background-color: #e0f7fa;
                          color: #0097a7;
                          font-size: 1.8em;
                          font-weight: bold;
                          padding: 15px;
                          border-radius: 5px;
                          margin-bottom: 20px;
                          display: inline-block;
                      }}
                      .name {{
                          color: #3b82f6; 
                          font-size: 1.2em;
                          margin-bottom: 5px;
                      }}
                  </style>
              </head>
              <body>
                  <div class=""container"">
                      <div class=""name"">&lt;Gustavo/&gt;</div>
                      <hr style=""border: 1px solid #eee; margin-bottom: 20px;"">
                      <div class=""header""> Código de Verificação</div>
                      <p class=""message"">Olá,</p>
                      <p class=""message"">Você solicitou recentemente um código de verificação. Utilize o código abaixo:</p>
                      <div class=""codigo"">{codigo}</div> 
                      <p class=""message"">Se você não solicitou este código, pode ignorar este e-mail.Não o compartilhe com ninguém.
                       Nuncasolicitaremos isso fora de uma plataforma oficial </p>
                  </div>
              </body>
              </html>
                         ";

            message.Body = bodyBuilder.ToMessageBody();

            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587, false);
                client.Authenticate(email, "yioepxqkrbfamqbu");
                client.Send(message);
                client.Disconnect(true);
            }
        }

        public void RedefinirSenhaSucesso(string email)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("<Gustavo/>", "gustavo_cordeiro27@gmail.com"));
            message.To.Add(new MailboxAddress("", email));
            message.Subject = "Senha Redefinida";

            var bodyBuilder = new BodyBuilder();
            bodyBuilder.HtmlBody = $@"<!DOCTYPE html>
                <html lang=""pt-BR"">
                <head>
                    <meta charset=""UTF-8"">
                    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
                    <title>Senha Alterada com Sucesso</title>
                    <style>
                        body {{
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            text-align: center; 
                            margin: 0;
                            padding: 20px; 
                        }}
                        .container {{
                            background-color: #fff;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            padding: 30px;
                            width: 400px;
                            margin: 20px auto; 
                            text-align: center;
                            border: 1px solid #ccc;
                        }}
                        .header {{
                            color: #3b82f6;
                            font-size: 1.5em;
                            margin-bottom: 20px;
                        }}
                        .developer {{
                            color: #777;
                            font-size: 0.8em;
                            margin-bottom: 10px;
                        }}
                        .message {{
                            color: #555;
                            margin-bottom: 20px;
                        }}
                        .status-container {{
                            background-color: #e6ffed;
                            color: #2e7d32;
                            font-size: 1.2em;
                            font-weight: bold;
                            padding: 15px;
                            border-radius: 5px;
                            margin-bottom: 20px;
                            display: inline-block;
                        }}
                        .name {{
                            color: #3b82f6; 
                            font-size: 1.2em;
                            margin-bottom: 5px;
                        }}
                        .footer {{
                            font-size: 0.85em;
                            color: #999;
                            margin-top: 20px;
                        }}
                        a {{
                            color: #3b82f6;
                            text-decoration: none;
                        }}
                    </style>
                </head>
                <body>
                    <div class=""container"">
                        <div class=""name"">&lt;Gustavo/&gt;</div>
                        <hr style=""border: 1px solid #eee; margin-bottom: 20px;"">
                        <div class=""header"">Senha Alterada com Sucesso</div>
                        <p class=""message"">Olá,</p>
                        <p class=""message"">Sua senha foi alterada com sucesso.</p>
                        <div class=""status-container"">✔️ Alteração Confirmada</div>
                        <p class=""message"">Se você não realizou essa alteração, <a href=""mailto:suporte@seudominio.com"">entre em contato com o suporte</a> imediatamente.</p>
                        <div class=""footer"">
                            Caso tenha dúvidas, nossa equipe está à disposição.
                        </div>
                    </div>
                </body>
                </html>
                
                ";

            message.Body = bodyBuilder.ToMessageBody();

            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587, false);
                client.Authenticate(email, "yioepxqkrbfamqbu");
                client.Send(message);
                client.Disconnect(true);
            }
        }


        // Gerar um código aleatório de 6 dígitos
        public string GerarCodigo()
        {
            return new Random().Next(100000, 999999).ToString();
        }

        // Validar o código inserido
        public bool ValidarCodigo(string contato, string codigoInserido)
        {
            return codigosVerificacao.ContainsKey(contato) && codigosVerificacao[contato] == codigoInserido;
        }

        // Armazenar o código no "banco de dados"
        public void ArmazenarCodigo(string contato, string codigo)
        {
            codigosVerificacao[contato] = codigo;
        }

      

    }
}

