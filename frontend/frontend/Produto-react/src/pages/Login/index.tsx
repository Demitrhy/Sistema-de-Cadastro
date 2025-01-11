import React, { useLayoutEffect } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { CardStyled, Div, P, Img } from './style';
import Logo from './assets/Logo.svg';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  // Lógica do login (validação com back-end)
  const onFinish = async (values: any) => {
    const { email, password } = values;

    try {
      // Chama a API para autenticação
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password,
      });

      // Sucesso na autenticação: salva o token no localStorage e redireciona
      const { token } = response.data;
      localStorage.setItem('authToken', token); // Armazena o token
      history.push(`${process.env.REACT_APP_PREFIX}/dashboard`); // Redireciona para o dashboard
    } catch (error) {
      // Exibe mensagens de erro no formulário
      form.setFields([
        {
          name: 'email',
          errors: ['E-mail ou senha inválidos'],
        },
        {
          name: 'password',
          errors: [''],
        },
      ]);
    }
  };

  // Redirecionar automaticamente para o dashboard se já estiver autenticado
  useLayoutEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      history.push(`${process.env.REACT_APP_PREFIX}/dashboard`);
    }
  }, [history]);

  // Se o usuário estiver autenticado, não mostra o formulário de login
  if (localStorage.getItem('authToken')) {
    return null;
  }

  return (
    <Div>
      <CardStyled
        bordered={false}
        title={
          <Row gutter={6}>
            <Col span={24}>
              {/* <Img width="235" height="40" src={Logo} /> */}
             
            </Col>
          </Row>
        }
      >
        <Form size="middle" form={form} onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Por favor insira seu e-mail!',
                type: 'email',
              },
            ]}
            hasFeedback
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="E-mail"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Por favor insira sua senha!',
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Senha"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Entrar
            </Button>
          </Form.Item>
        </Form>

        <div>
          <Row gutter={6}>
            <Col span={19}>
              <P>Copyright Empreendimentos</P>
            </Col>
            <Col span={5}>
              <P>© {new Date().getFullYear()}</P>
            </Col>
          </Row>
        </div>
      </CardStyled>
    </Div>
  );
};

export default Login;
