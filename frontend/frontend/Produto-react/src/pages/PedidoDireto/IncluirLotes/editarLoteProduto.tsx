import React, { useEffect, useState } from 'react';
import { Drawer, Button, Row, Table, Col, Input, Divider, message, Card, Space, Tag, Form } from 'antd';
import { Lote, LotesPorProduto, ProdutoSemLote } from '../../../store/PedidoDireto/PedidoDireto';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { getUser } from '../../../utils/AuthService';
import { getLotesPorProduto, postAtualizarLotesPedidoDireto } from '../../../services/apiservices';
import { validarFabricacaoVencimentoLote } from '../../../utils/validarFabricacaoVencimentoLote';

function ModalEditarLoteProduto(props: any) {
	const [form] = Form.useForm();
	const [lotes, setLotes] = useState<Array<Lote>>([]);
	const [editingRow, setEditingRow] = useState("");
	const [totalItens, setTotalItens] = useState(0);
	const [lotesPorProduto, setLotesPorProduto] = useState<Array<LotesPorProduto>>([]);


	const onClose = () => {
		props.onClose();
	};

	useEffect(() => {
		setLotes(props.produto.lotes)
		getLotesPorProduto(props.produto.produto)
			.then((lotes) => {
				if (lotes.data.length > 0) {
					setLotesPorProduto(lotes.data)
				} else {
					message.warning("Produto sem lotes cadastrados.")
				}
			})
	}, [])


	useEffect(() => {
		let soma = 0;
		if (lotes.length > 0) {
			for (const lote of lotes) {
				soma = parseInt(soma.toString()) + parseInt(lote.quantidadeItem.toString());
			}
		}
		setTotalItens(soma);
	}, [lotes])

	const onFinish = (values) => {
		if (values.lote != undefined) {
			let validacaoFabricacaoVencimento = validarFabricacaoVencimentoLote(values.dataFabricacao, values.dataVencimento);

			if (validacaoFabricacaoVencimento != undefined) {
				message.error(validacaoFabricacaoVencimento);
			} else if (lotesPorProduto.find(l => l.lote.toUpperCase().trim() == values.lote.toUpperCase().trim() && l.fabricacao == values.dataFabricacao && l.vencimento == values.dataVencimento) == undefined) {
				message.error("Lote inválido! Não existe registro dele no Cosmos.")
			} else {
				atualizarLote(values);
			}
		}
	};

	function deletarItem(data: any) {
		let filtered = lotes.filter(function (i) { return i.lote.trim() != data.lote.trim() })

		if (filtered.length > 0) {
			setLotes(filtered?.map((row: any) => {
				return {
					...row,
					key: row.lote,
					lote: row.lote,
					dataFabricacao: row.dataFabricacao,
					dataVencimento: row.dataVencimento,
					quantidadeItem: row.quantidadeItem
				};
			}))
		}
		else
			setLotes([])
	}

	const columns = [
		{
			title: 'Lote',
			dataIndex: 'lote',
			key: 'lote',
			align: 'center' as 'center',
			width: '20%',
			render: (text, record) => {
				if (editingRow == record.lote) {
					return (
						<Form.Item name='lote'
							rules={[
								{
									required: true,
									message: "Informe um lote"
								}
							]}>
							<Input />
						</Form.Item>)
				} else
					return (<>{text}</>)
			}
		},
		{
			title: 'Data fabricação',
			dataIndex: 'dataFabricacao',
			key: 'dataFabricacao',
			align: 'center' as 'center',
			width: '20%',
			render: (text, record) => {
				if (editingRow == record.lote) {
					return (
						<Form.Item name='dataFabricacao'
							rules={[
								{
									required: true,
									message: "Informe uma fabricacao"
								}
							]}>
							<Input />
						</Form.Item>)
				} else
					return (<>{text}</>)
			}
		},
		{
			title: 'Data vencimento',
			dataIndex: 'dataVencimento',
			key: 'dataVencimento',
			align: 'center' as 'center',
			width: '20%',
			render: (text, record) => {
				if (editingRow == record.lote) {
					return (
						<Form.Item name='dataVencimento'
							rules={[
								{
									required: true,
									message: "Informe um vencimento"
								}
							]}>
							<Input />
						</Form.Item>)
				} else
					return (<>{text}</>)
			}
		},
		{
			title: 'Quantidade item',
			dataIndex: 'quantidadeItem',
			key: 'quantidadeItem',
			align: 'center' as 'center',
			width: '10%',
			render: (text, record) => {
				if (editingRow == record.lote) {
					return (
						<Form.Item name='quantidadeItem'
							rules={[
								{
									required: true,
									message: "Informe uma quantidade",
								}
							]}>
							<Input />
						</Form.Item>)
				} else
					return (<>{text}</>)
			}
		},
		{
			title: 'Ações',
			dataIndex: 'x',
			key: 'x',
			align: 'center' as 'center',
			width: '30%',
			render: (text: any, record: any) => (
				<div>
					<Button type='link'
						style={{ color: '#6B85F0' }}
						onClick={
							() => {
								setEditingRow(record.lote);
								form.setFieldsValue({
									key: record.lote,
									lote: record.lote,
									dataFabricacao: record.dataFabricacao,
									dataVencimento: record.dataVencimento,
									quantidadeItem: record.quantidadeItem,
								})
							}
						}
						icon={<EditOutlined />} />

					<Button
						type='link'
						style={{ color: '#3AC758', cursor: 'pointer' }}
						icon={<CheckCircleOutlined />}
						htmlType='submit' />

					<Button
						type='link'
						style={{ color: '#C73A54' }}
						disabled={lotes.length == 1 || editingRow.length > 0}
						icon={<CloseCircleOutlined />}
						onClick={() => deletarItem(record)}
						htmlType='submit' />
				</div>
			)
		}
	]

	function atualizarLote(values) {
		const updatedDataSource = [...lotes];

		let index = 0;

		if (editingRow != "")
			index = updatedDataSource.findIndex(f => f.lote == editingRow);
		else
			index = updatedDataSource.findIndex(f => f.lote == "");

		updatedDataSource.splice(index, 1, { ...values, key: editingRow });
		setLotes(updatedDataSource);
		setEditingRow("")
	}

	function inserirListaLotes() {
		const novoLote: Lote = {
			lote: "",
			dataFabricacao: "",
			dataVencimento: "",
			quantidadeItem: 0
		};

		form.setFieldsValue({
			key: "",
			lote: "",
			dataFabricacao: "",
			dataVencimento: "",
			quantidadeItem: ""
		})

		setLotes([...lotes, novoLote]);
	}

	function atualizarLotes() {
		let pedido = parseInt(props.pedido.substring(0, 7));
		let sequencial = parseInt(props.pedido.replace(pedido, ""));

		var produtoLote = {
			deposito: props.produto.deposito,
			produto: props.produto.produto,
			lotes: lotes
		}

		postAtualizarLotesPedidoDireto(pedido, sequencial, produtoLote)
			.then((sucess) => {
				message.success("Lotes atualizados com sucesso!");
			})
			.catch((error) => {
				message.error("Ocorreu um erro ao tentar atualizar lotes. Favor, tente novamente.")
			})
	}



	return (
		<>
			<Drawer
				width={620}
				visible={true}
				onClose={onClose}
				footer={
					<div
						style={{ textAlign: 'right' }}>
						<Button onClick={onClose} style={{ marginRight: 8 }}>
							Sair
						</Button>
						<Button
							onClick={atualizarLotes}
							disabled={totalItens != props.produto.quantidadeAtendida}
							type="primary">
							Salvar alterações
						</Button>
					</div>
				}>

				<div style={{ fontSize: '20px', textAlign: 'center' }}>
					{props.produto.descricaoProduto}
					<div>
						<Tag
							color={props.produto.quantidadeAtendida === totalItens ? "#87d068" : "#f50"}
							style={{ width: '46em', fontWeight: 'bold' }}>
							{`Quantidade atendida do produto: ${props.produto.quantidadeAtendida} | Soma dos lotes: ${totalItens}`}
						</Tag>
					</div>
				</div>
				<Form form={form} onFinish={onFinish}>
					<Table
						columns={columns}
						style={{ marginTop: '1em' }}
						dataSource={lotes}
						footer={() =>
							<>
								{props.produto.quantidadeAtendida > 1 &&
									<Button
										size='small'
										type="primary"
										disabled={totalItens == props.produto.quantidadeAtendida}
										onClick={inserirListaLotes}
										style={{ marginLeft: '30em' }}
										icon={<PlusCircleOutlined />}>
										Adicionar
									</Button>
								}
							</>
						}
					/>
				</Form>
			</Drawer>
		</>
	)
}

export default ModalEditarLoteProduto;